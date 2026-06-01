namespace SavingsTracker.GoalService.Models;

public class Goal(GoalDb.Goal goal)
{
  public int Id { get; set; } = goal.Id;
  public string Name { get; set; } = goal.Name;
  public int Target { get; set; } = goal.Target;
  public DateOnly? Deadline { get; set; } = goal.Deadline;
  public DateTimeOffset CreatedAt { get; set; } = goal.CreatedAt;
  public IEnumerable<Deposit> Deposits { get; set; } = goal.Deposits.Select(d => new Deposit(d));
}