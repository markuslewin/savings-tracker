using System.ComponentModel.DataAnnotations;
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

app.MapGet("/goals", async Task<Ok<IQueryable<Goal>>> (GoalDbContext ctx) =>
{
    var goals = ctx
        .Goals
        .AsNoTracking()
        .Include(g => g.Deposits)
        .OrderByDescending(g => g.CreatedAt)
        .Select(g => new Goal(g));
    return TypedResults.Ok(goals);
});

app.MapGet("/goals/{id}", async Task<Results<Ok<Goal>, NotFound>> (int id, GoalDbContext ctx) =>
{
    var goal = await ctx
        .Goals
        .Include(g => g.Deposits)
        .FirstOrDefaultAsync(g => g.Id == id);
    if (goal is null) return TypedResults.NotFound();

    return TypedResults.Ok(new Goal(goal));
});

app.MapPost("/goals", async Task<Created<Goal>> (GoalDbContext ctx, AddGoalRequest goal) =>
{
    var result = await ctx.Goals.AddAsync(new SavingsTracker.GoalDb.Goal
    {
        Name = goal.Name,
        Target = goal.Target,
    });
    await ctx.SaveChangesAsync();

    return TypedResults.Created(
        $"/goals/${result.Entity.Id}",
        new Goal(result.Entity));
});

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

    })
    .WithName(confirmEmailEndpointName);


app.Run();