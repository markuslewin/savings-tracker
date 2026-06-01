using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalService.Models;
using Goal = SavingsTracker.GoalService.Models.Goal;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// builder.AddServiceDefaults();
builder.AddNpgsqlDbContext<GoalDbContext>("goaldb");

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

app.Run();
