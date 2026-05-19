using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SavingsTracker.GoalDb;

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

app.MapGet("/goals", async Task<Ok<IEnumerable<Goal>>> (GoalDbContext ctx) =>
{
    var goals = await ctx
        .Goals
        .AsNoTracking()
        .Include(g => g.Deposits)
        .OrderByDescending(g => g.CreatedAt)
        .ToListAsync();
    return TypedResults.Ok(goals.Select(g => new Goal(g)));
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

app.MapPost("/goals", async Task<Created<Goal>> (GoalDbContext ctx, PostGoal goal) =>
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

public class Goal(SavingsTracker.GoalDb.Goal goal)
{
    public int Id { get; set; } = goal.Id;
    public string Name { get; set; } = goal.Name;
    public int Target { get; set; } = goal.Target;
    public DateOnly? Deadline { get; set; } = goal.Deadline;
    public DateTimeOffset CreatedAt { get; set; } = goal.CreatedAt;
    public IEnumerable<Deposit> Deposits { get; set; } = goal.Deposits.Select(d => new Deposit(d));
}

public class Deposit(SavingsTracker.GoalDb.Deposit deposit)
{
    public int Id { get; set; } = deposit.Id;
    public int Amount { get; set; } = deposit.Amount;
    public string Note { get; set; } = deposit.Note;
    public DateTimeOffset CreatedAt { get; set; } = deposit.CreatedAt;
}

public class PostGoal
{
    public string Name { get; set; }
    public int Target { get; set; }
}
