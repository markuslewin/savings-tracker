namespace SavingsTracker.GoalDb;

public class Deposit
{
  public string Id { get; set; }
  public int Amount { get; set; }
  public string Note { get; set; }
  public DateTimeOffset CreatedAt { get; set; }

  public string GoalId { get; set; }
  public Goal Goal { get; set; }
}