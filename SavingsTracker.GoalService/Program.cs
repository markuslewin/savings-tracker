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

app.MapGet("/goals", (GoalDbContext ctx) =>
{
    return ctx
        .Goals
        .AsNoTracking()
        .OrderByDescending(g => g.CreatedAt)
        .Select(g => new
        {
            g.Id,
            g.Name,
            g.Target,
            g.Deadline,
            g.CreatedAt,
            Deposits = g.Deposits.Select(d => new
            {
                d.Id,
                d.Amount,
                d.Note,
                d.CreatedAt
            })
        });
});
app.MapPost("/goals", async (GoalDbContext ctx, PostGoal goal) =>
{
    var result = await ctx.Goals.AddAsync(new Goal
    {
        Name = goal.Name,
        Target = goal.Target,
    });
    await ctx.SaveChangesAsync();

    return TypedResults.Created($"/goals/${result.Entity.Id}", new
    {
        result.Entity.Id
    });
});

app.Run();

public class PostGoal
{
    public string Name { get; set; }
    public int Target { get; set; }
}
