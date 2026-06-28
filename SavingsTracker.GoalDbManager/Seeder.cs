using System.Text.Json;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalDbManager;

public class Data
{
  public IList<Goal>? Goals { get; set; }
}

public class Goal
{
  public string? Id { get; set; }
  public string? Name { get; set; }
  public int Target { get; set; }
  public DateOnly? Deadline { get; set; }
  public DateTimeOffset CreatedAt { get; set; }
  public IList<Deposit>? Deposits { get; set; }
}

public class Deposit
{
  public string? Id { get; set; }
  public int Amount { get; set; }
  public string? Note { get; set; }
  public DateTimeOffset CreatedAt { get; set; }
}

public static class Seeder
{
  public static void Seed(GoalDbContext ctx, User owner)
  {
    var text = File.ReadAllText("data.json");
    var data = JsonSerializer.Deserialize<Data>(text, JsonSerializerOptions.Web);
    if (data is null) return;
    if (data.Goals is null) return;

    ctx.Goals.AddRange(data.Goals.Select(g => new GoalDb.Goal
    {
      Name = g.Name ?? throw new NullReferenceException(nameof(g.Name)),
      Target = g.Target,
      Deadline = g.Deadline,
      CreatedAt = g.CreatedAt,
      User = owner,
      Deposits = g.Deposits is null
        ? throw new NullReferenceException(nameof(g.Deposits))
        : [..g.Deposits.Select(d =>
        {
          return new GoalDb.Deposit
          {
            Amount = d.Amount,
            Note = d.Note ?? throw new NullReferenceException(nameof(d.Note)),
            CreatedAt = d.CreatedAt
          };
        })]
    }));
    ctx.SaveChanges();
  }
}