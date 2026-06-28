using System.Text.Json;

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

public static class SeedDataReader
{
  public static Data? Read()
  {
    var text = File.ReadAllText("data.json");
    return JsonSerializer.Deserialize<Data>(text, JsonSerializerOptions.Web);
  }
}