using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalService.Helpers;
using SavingsTracker.GoalService.Models;
using SavingsTracker.GoalService.Services;

using Goal = SavingsTracker.GoalService.Models.Goal;

const string confirmEmailEndpointName = "ConfirmEmail";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
});

ValidatorOptions.Global.DefaultRuleLevelCascadeMode = CascadeMode.Stop;
builder.Services
    .AddScoped<IValidator<AddGoalRequest>, AddGoalRequestValidator>()
    .AddScoped<IValidator<PatchGoalRequest>, PatchGoalRequestValidator>()
    .AddScoped<IValidator<AddDepositRequest>, AddDepositRequestValidator>()
    .AddScoped<IValidator<RegisterRequest>, RegisterRequestValidator>()
    .AddScoped<IValidator<LoginRequest>, LoginRequestValidator>()
    .AddScoped<IValidator<PostUserRequest>, PostUserRequestValidator>()
    .AddScoped<IValidator<ChangePasswordRequest>, ChangePasswordRequestValidator>()
    ;

// Apply JSON naming policy to `HttpValidationProblemDetails.Errors`
// https://github.com/captainsafia/minapi-validation-support/blob/d2aa17b79fc620b36c5a777f8da3508216852217/api/Program.cs#L34
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        if (context.ProblemDetails is HttpValidationProblemDetails problemDetails)
        {
            var jsonNamingPolicy = context
                .HttpContext
                .RequestServices
                .GetRequiredService<IOptions<JsonOptions>>()
                .Value
                .SerializerOptions
                .PropertyNamingPolicy;
            if (jsonNamingPolicy is not null)
            {
                problemDetails.Errors =
                    problemDetails.Errors.ToDictionary(
                        kvp => jsonNamingPolicy.ConvertName(kvp.Key),
                        kvp => kvp.Value);
            }

        }
    };
});

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.AddServiceDefaults();

builder.AddNpgsqlDbContext<GoalDbContext>("goaldb");

builder.Services.AddTransient<IEmailSender, LoggerEmailSender>();

builder
    .Services
    .AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<GoalDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app
    .MapGet("/goals",
        async Task<Results<Ok<IQueryable<Goal>>, UnauthorizedHttpResult>> (
            Sort sort,
            ClaimsPrincipal principal,
            UserManager<User> userManager,
            GoalDbContext ctx) =>
        {
            var user = await userManager.GetUserAsync(principal);
            IQueryable<SavingsTracker.GoalDb.Goal> query = ctx.Goals
                .AsNoTracking()
                .Include(g => g.Deposits)
                .OrderByDescending(g => g.CreatedAt);

            query = user switch
            {
                null => query.Where(g => g.User!.IsDemo),
                User => query.Where(g => g.UserId == user.Id)
            };

            query = sort switch
            {
                Sort.RecentlyAdded => query.OrderByDescending(g => g.CreatedAt),
                Sort.DeadlineAscending => throw new NotImplementedException(),
                Sort.ProgressDescending =>
                    query.OrderByDescending(g =>
                        g.Deposits.Sum(d => d.Amount) / g.Target),
                Sort.ProgressAscending =>
                    query.OrderBy(g =>
                        g.Deposits.Sum(d => d.Amount) / g.Target),
                Sort.AmountSavedDescending =>
                    query.OrderByDescending(g => g.Deposits.Sum(d => d.Amount)),
                Sort.AlphabeticalAscending => query.OrderBy(g => g.Name),
                _ => throw new Exception("Invalid sort"),
            };

            return TypedResults.Ok(query.Select(g => new Goal(g)));
        });

app
    .MapGet("/goals/{id}", async Task<Results<Ok<Goal>, NotFound, UnauthorizedHttpResult>> (
        int id,
        ClaimsPrincipal principal,
        UserManager<User> userManager,
        GoalDbContext ctx) =>
    {
        var goal = await ctx.Goals
            .Include(g => g.User)
            .Include(g => g.Deposits.OrderByDescending(d => d.CreatedAt))
            .FirstOrDefaultAsync(g => g.Id == id);
        if (goal is null) return TypedResults.NotFound();

        if (goal.User!.IsDemo) return TypedResults.Ok(new Goal(goal));

        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        if (goal.UserId != user.Id) return TypedResults.Unauthorized();

        return TypedResults.Ok(new Goal(goal));
    });

app
    .MapPost("/goals", async Task<Results<Created<Goal>, ValidationProblem, UnauthorizedHttpResult>> (
        ClaimsPrincipal principal,
        UserManager<User> userManager,
        GoalDbContext ctx,
        AddGoalRequest goal,
        IValidator<AddGoalRequest> validator) =>
    {
        var validation = await validator.ValidateAsync(goal);
        if (!validation.IsValid)
            return TypedResults.ValidationProblem(validation.ToDictionary());

        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var result = await ctx.Goals.AddAsync(new SavingsTracker.GoalDb.Goal
        {
            Name = goal.Name,
            Target = goal.ValidTarget,
            User = user,
            Deposits = []
        });
        await ctx.SaveChangesAsync();

        return TypedResults.Created(
            $"/goals/${result.Entity.Id}",
            new Goal(result.Entity));
    })
    .RequireAuthorization();

app
    .MapPatch("/goals/{id}", async Task<Results<NoContent, ValidationProblem, UnauthorizedHttpResult, NotFound>> (
        int id,
        PatchGoalRequest patch,
        IValidator<PatchGoalRequest> validator,
        GoalDbContext ctx,
        ClaimsPrincipal principal,
        UserManager<User> userManager) =>
    {
        var validation = await validator.ValidateAsync(patch);
        if (!validation.IsValid)
            return TypedResults.ValidationProblem(validation.ToDictionary());

        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var goal = await ctx.Goals.FindAsync(id);
        if (goal is null) return TypedResults.NotFound();

        if (goal.UserId != user.Id) return TypedResults.Unauthorized();

        if (patch.Name is not null)
        {
            goal.Name = patch.Name;
        }
        if (patch.ValidTarget is decimal target)
        {
            goal.Target = target;
        }
        await ctx.SaveChangesAsync();

        return TypedResults.NoContent();
    })
    .RequireAuthorization();

app
    .MapDelete("/goals/{id}", async Task<Results<NoContent, UnauthorizedHttpResult, NotFound>> (
        int id,
        GoalDbContext ctx,
        ClaimsPrincipal principal,
        UserManager<User> userManager) =>
    {
        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var goal = await ctx.Goals.FindAsync(id);
        if (goal is null) return TypedResults.NotFound();

        if (goal.UserId != user.Id) return TypedResults.Unauthorized();

        ctx.Goals.Remove(goal);
        await ctx.SaveChangesAsync();

        return TypedResults.NoContent();
    })
    .RequireAuthorization();

app
    .MapPost("/goals/{id}/deposits",
        async Task<Results<NoContent, ValidationProblem, UnauthorizedHttpResult, NotFound>> (
            int id,
            AddDepositRequest deposit,
            IValidator<AddDepositRequest> validator,
            ClaimsPrincipal principal,
            UserManager<User> userManager,
            GoalDbContext ctx) =>
        {
            var validation = await validator.ValidateAsync(deposit);
            if (!validation.IsValid)
                return TypedResults.ValidationProblem(validation.ToDictionary());

            var user = await userManager.GetUserAsync(principal);
            if (user is null) return TypedResults.Unauthorized();

            var goal = await ctx.Goals.FindAsync(id);
            if (goal is null) return TypedResults.NotFound();

            if (goal.UserId != user.Id) return TypedResults.Unauthorized();

            await ctx.Deposits.AddAsync(new SavingsTracker.GoalDb.Deposit
            {
                Amount = deposit.ValidAmount,
                Note = deposit.ValidNote,
                Goal = goal
            });
            await ctx.SaveChangesAsync();

            return TypedResults.NoContent();
        })
    .RequireAuthorization();

var accountGroup = app.MapGroup("/accounts");

accountGroup.MapPost("/register", async Task<Results<Ok, ValidationProblem>> (
    RegisterRequest registration,
    IValidator<RegisterRequest> validator,
    UserManager<User> userManager,
    IUserStore<User> userStore,
    IEmailSender<User> emailSender,
    LinkGenerator linkGenerator,
    HttpContext httpContext) =>
{
    var validation = await validator.ValidateAsync(registration);
    if (!validation.IsValid)
        return TypedResults.ValidationProblem(validation.ToDictionary());

    var user = new User
    {
        FullName = registration.ValidFullName,
    };
    await userStore.SetUserNameAsync(user, registration.ValidEmail, CancellationToken.None);
    if (userStore is not IUserEmailStore<User> userEmailStore)
    {
        throw new Exception("User store is not a user email store.");
    }
    await userEmailStore.SetEmailAsync(user, registration.ValidEmail, CancellationToken.None);

    var result = await userManager.CreateAsync(user, registration.ValidPassword);
    if (!result.Succeeded)
    {
        return TypedResults.ValidationProblem(
            result.Errors
                .GroupBy(e => e.Code, e => e.Description)
                .ToDictionary(g => g.Key, g => g.ToArray()));
    }

    var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
    var encodedCode = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
    var userId = await userManager.GetUserIdAsync(user);
    var confirmEmailUrl = linkGenerator.GetUriByName(
        httpContext, confirmEmailEndpointName, new RouteValueDictionary
        {
            ["userId"] = userId,
            ["code"] = encodedCode
        })
        ?? throw new Exception(
            $"Could not find endpoint with name '{confirmEmailEndpointName}'.");
    await emailSender.SendConfirmationLinkAsync(
        user, registration.ValidEmail, HtmlEncoder.Default.Encode(confirmEmailUrl));

    return TypedResults.Ok();
});

accountGroup
    .MapGet("/confirmEmail", async Task () =>
    {
        throw new NotImplementedException();
    })
    .WithName(confirmEmailEndpointName);

accountGroup.MapPost("/login",
    async Task<Results<EmptyHttpResult, ValidationProblem, ProblemHttpResult>> (
        LoginRequest login,
        IValidator<LoginRequest> validator,
        SignInManager<User> signInManager) =>
    {
        var validation = await validator.ValidateAsync(login);
        if (!validation.IsValid)
            return TypedResults.ValidationProblem(validation.ToDictionary());

        var result = await signInManager.PasswordSignInAsync(
            login.ValidEmail,
            login.ValidPassword,
            isPersistent: true,
            lockoutOnFailure: true);
        if (!result.Succeeded)
        {
            return TypedResults.Problem(
                result.ToString(),
                statusCode: StatusCodes.Status401Unauthorized);
        }
        return TypedResults.Empty;
    });

accountGroup
    .MapPost("/logout",
        async Task<EmptyHttpResult> (SignInManager<User> signInManager) =>
        {
            await signInManager.SignOutAsync();
            return TypedResults.Empty;
        })
    .RequireAuthorization();

accountGroup
    .MapGet("/info",
        async Task<Results<Ok<UserResponse>, UnauthorizedHttpResult>> (
            ClaimsPrincipal principal, UserManager<User> userManager) =>
    {
        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        return TypedResults.Ok(new UserResponse
        {
            FullName = user.FullName,
            Email = user.Email ?? throw new Exception("User must have email")
        });
    })
    .RequireAuthorization();

accountGroup
    .MapPost("/info",
        async Task<
            Results<EmptyHttpResult, UnauthorizedHttpResult, ValidationProblem>
        > (
            PostUserRequest postUserRequest,
            IValidator<PostUserRequest> validator,
            ClaimsPrincipal principal,
            UserManager<User> userManager) =>
        {
            var validation = await validator.ValidateAsync(postUserRequest);
            if (!validation.IsValid)
                return TypedResults.ValidationProblem(validation.ToDictionary());

            var user = await userManager.GetUserAsync(principal);
            if (user is null) return TypedResults.Unauthorized();

            if (user.FullName != postUserRequest.ValidFullName)
            {
                user.FullName = postUserRequest.ValidFullName;
            }

            if (user.Email != postUserRequest.ValidEmail)
            {
                await userManager.SetEmailAsync(user, postUserRequest.ValidEmail);
                await userManager.SetUserNameAsync(user, postUserRequest.ValidEmail);
            }

            await userManager.UpdateAsync(user);

            return TypedResults.Empty;
        })
    .RequireAuthorization();

accountGroup
    .MapPost("/changePassword",
        async Task<Results<EmptyHttpResult, ValidationProblem, UnauthorizedHttpResult>> (
            ChangePasswordRequest changePasswordRequest,
            IValidator<ChangePasswordRequest> validator,
            ClaimsPrincipal principal,
            UserManager<User> userManager,
            IUserStore<User> userStore) =>
        {
            var validation = await validator.ValidateAsync(changePasswordRequest);
            if (!validation.IsValid)
                return TypedResults.ValidationProblem(validation.ToDictionary());

            var user = await userManager.GetUserAsync(principal);
            if (user is null) return TypedResults.Unauthorized();

            // `UserManager.ChangePasswordAsync` requires the current password.
            // The design doesn't include that text field, so we bypass the manager here.
            if (userStore is not IUserPasswordStore<User> passwordStore)
                throw new Exception("User store is not a password store");

            var result =
                await IdentityHelper.ValidatePassword(
                    userManager, user, changePasswordRequest.ValidPassword);
            if (!result.Succeeded)
            {
                throw new NotImplementedException();
            }

            var hash =
                userManager.PasswordHasher.HashPassword(
                    user, changePasswordRequest.ValidPassword);
            await passwordStore.SetPasswordHashAsync(
                user, hash, CancellationToken.None);
            await userManager.UpdateSecurityStampAsync(user);

            return TypedResults.Empty;
        })
    .RequireAuthorization();

app.Run();