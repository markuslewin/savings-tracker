using System.Text.Json;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalDbManager;

public class Data
{
  public IList<Goal> Goals { get; set; }
}

public class Goal
{
  public string Id { get; set; }
  public string Name { get; set; }
  public int Target { get; set; }
  public DateOnly? Deadline { get; set; }
  public DateTimeOffset CreatedAt { get; set; }
  public IList<Deposit> Deposits { get; set; }
}

public class Deposit
{
  public string Id { get; set; }
  public int Amount { get; set; }
  public string Note { get; set; }
  public DateTimeOffset CreatedAt { get; set; }
}

public static class Seeder
{
  public static void Seed(GoalDbContext ctx)
  {
    var text = File.ReadAllText("data.json");
    var data = JsonSerializer.Deserialize<Data>(text, JsonSerializerOptions.Web);

    ctx.Goals.AddRange(data.Goals.Select(g => new GoalDb.Goal
    {
      Id = g.Id,
      Name = g.Name,
      Target = g.Target,
      Deadline = g.Deadline,
      CreatedAt = g.CreatedAt,
      Deposits = [.. g.Deposits.Select(deposit =>
        {
          return new GoalDb.Deposit
          {
            Id = deposit.Id,
            Amount = deposit.Amount,
            Note = deposit.Note,
            CreatedAt = deposit.CreatedAt
          };
        })]
    }));
    ctx.SaveChanges();
  }
}