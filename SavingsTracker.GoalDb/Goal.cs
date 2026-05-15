namespace SavingsTracker.GoalDb;

public class Goal
{
  public string Id { get; set; }
  public string Name { get; set; }
  public int Target { get; set; }
  public DateOnly? Deadline { get; set; }
  // public int UserId { get; set; }

  public DateTimeOffset CreatedAt { get; set; }
  // public DateTimeOffset UpdatedAt { get; set; }

  public ICollection<Deposit> Deposits { get; set; }
}
