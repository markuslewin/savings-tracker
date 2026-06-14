using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalService.Models;
using SavingsTracker.GoalService.Services;

using Goal = SavingsTracker.GoalService.Models.Goal;

const string confirmEmailEndpointName = "ConfirmEmail";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// builder.AddServiceDefaults();
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
            ClaimsPrincipal principal,
            UserManager<User> userManager,
            GoalDbContext ctx) =>
        {
            var user = await userManager.GetUserAsync(principal);
            IQueryable<SavingsTracker.GoalDb.Goal> query = ctx.Goals
                .AsNoTracking()
                .Include(g => g.Deposits)
                .OrderByDescending(g => g.CreatedAt);
            if (user is null)
            {
                query = query.Where(g => g.User.IsDemo);
            }
            else
            {
                query = query.Where(g => g.UserId == user.Id);
            }
            return TypedResults.Ok(query.Select(g => new Goal(g)));
        });

app
    .MapGet("/goals/{id}", async Task<Results<Ok<Goal>, NotFound>> (
        int id,
        ClaimsPrincipal principal,
        UserManager<User> userManager,
        GoalDbContext ctx) =>
    {
        IQueryable<SavingsTracker.GoalDb.Goal> query = ctx
            .Goals
            .Include(g => g.Deposits);

        var user = await userManager.GetUserAsync(principal);
        Expression<Func<SavingsTracker.GoalDb.Goal, bool>> predicate;
        if (user is null)
        {
            predicate = g => g.User.IsDemo && g.Id == id;
        }
        else
        {
            predicate = g => g.UserId == user.Id && g.Id == id;
        }

        var goal = await query.FirstOrDefaultAsync(predicate);
        if (goal is null) return TypedResults.NotFound();

        return TypedResults.Ok(new Goal(goal));
    });

app
    .MapPost("/goals", async Task<Results<Created<Goal>, UnauthorizedHttpResult>> (
        ClaimsPrincipal principal,
        UserManager<User> userManager,
        GoalDbContext ctx,
        AddGoalRequest goal) =>
    {
        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var result = await ctx.Goals.AddAsync(new SavingsTracker.GoalDb.Goal
        {
            Name = goal.Name,
            Target = goal.Target,
            User = user
        });
        await ctx.SaveChangesAsync();

        return TypedResults.Created(
            $"/goals/${result.Entity.Id}",
            new Goal(result.Entity));
    })
    .RequireAuthorization();

app
    .MapPatch("/goals/{id}", async Task<Results<NoContent, UnauthorizedHttpResult, NotFound, ForbidHttpResult>> (
        int id,
        PatchGoalRequest patch,
        GoalDbContext ctx,
        ClaimsPrincipal principal,
        UserManager<User> userManager) =>
    {
        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var goal = await ctx.Goals.FindAsync(id);
        if (goal is null) return TypedResults.NotFound();

        if (goal.UserId != user.Id) return TypedResults.Forbid();

        if (patch.Name is not null)
        {
            goal.Name = patch.Name;
        }
        if (patch.Target.HasValue)
        {
            goal.Target = patch.Target.Value;
        }
        await ctx.SaveChangesAsync();

        return TypedResults.NoContent();
    })
    .RequireAuthorization();

app
    .MapDelete("/goals/{id}", async Task<Results<NoContent, UnauthorizedHttpResult, NotFound, ForbidHttpResult>> (
        int id,
        GoalDbContext ctx,
        ClaimsPrincipal principal,
        UserManager<User> userManager) =>
    {
        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var goal = await ctx.Goals.FindAsync(id);
        if (goal is null) return TypedResults.NotFound();

        if (goal.UserId != user.Id) return TypedResults.Forbid();

        ctx.Goals.Remove(goal);
        await ctx.SaveChangesAsync();

        return TypedResults.NoContent();
    })
    .RequireAuthorization();

app
    .MapPost("/goals/{id}/deposits", async Task<Results<NoContent, UnauthorizedHttpResult, NotFound, ForbidHttpResult>> (
        int id,
        AddDepositRequest deposit,
        ClaimsPrincipal principal,
        UserManager<User> userManager,
        GoalDbContext ctx) =>
    {
        var user = await userManager.GetUserAsync(principal);
        if (user is null) return TypedResults.Unauthorized();

        var goal = await ctx.Goals.FindAsync(id);
        if (goal is null) return TypedResults.NotFound();

        if (goal.UserId != user.Id) return TypedResults.Forbid();

        goal.Deposits.Add(new SavingsTracker.GoalDb.Deposit
        {
            Amount = deposit.Amount,
            Note = deposit.Note
        });
        await ctx.SaveChangesAsync();

        return TypedResults.NoContent();
    })
    .RequireAuthorization();

var accountGroup = app.MapGroup("/accounts");

accountGroup.MapPost("/register", async Task<Results<Ok, ValidationProblem>> (
    RegisterRequest registration,
    UserManager<User> userManager,
    IUserStore<User> userStore,
    IEmailSender<User> emailSender,
    LinkGenerator linkGenerator,
    HttpContext httpContext) =>
{
    if (string.IsNullOrEmpty(registration.Email)
        || !new EmailAddressAttribute().IsValid(registration.Email))
    {
        var error = userManager.ErrorDescriber.InvalidEmail(registration.Email);
        return TypedResults.ValidationProblem(new Dictionary<string, string[]>
        {
            [error.Code] = [error.Description]
        });
    }

    var user = new User
    {
        FullName = registration.FullName,
    };
    await userStore.SetUserNameAsync(user, registration.Email, CancellationToken.None);
    if (userStore is not IUserEmailStore<User> userEmailStore)
    {
        throw new Exception("User store is not a user email store.");
    }
    await userEmailStore.SetEmailAsync(user, registration.Email, CancellationToken.None);

    var result = await userManager.CreateAsync(user, registration.Password);
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
        user, registration.Email, HtmlEncoder.Default.Encode(confirmEmailUrl));

    return TypedResults.Ok();
});

accountGroup
    .MapGet("/confirmEmail", async Task () =>
    {
        throw new NotImplementedException();
    })
    .WithName(confirmEmailEndpointName);

accountGroup.MapPost("/login",
    async Task<Results<EmptyHttpResult, ProblemHttpResult>> (
        LoginRequest login, SignInManager<User> signInManager) =>
    {
        var result = await signInManager.PasswordSignInAsync(
            login.Email,
            login.Password,
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

app.Run();