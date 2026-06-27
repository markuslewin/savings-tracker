namespace SavingsTracker.GoalDb;

public class Deposit
{
  public int Id { get; set; }
  public decimal Amount { get; set; }
  public string Note { get; set; }
  public DateTimeOffset CreatedAt { get; set; }

  public int GoalId { get; set; }
  public Goal Goal { get; set; }
}