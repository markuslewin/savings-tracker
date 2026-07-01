namespace SavingsTracker.GoalService.Models;

public class Goal
{
  public int Id { get; set; }
  public string Name { get; set; }
  public decimal Target { get; set; }
  public DateOnly? Deadline { get; set; }
  public DateTimeOffset CreatedAt { get; set; }
  public IEnumerable<Deposit> Deposits { get; set; }

  public Goal() { }

  // todo: Use helper
  public Goal(GoalDb.Goal goal)
  {
    Id = goal.Id;
    Name = goal.Name;
    Target = goal.Target;
    Deadline = goal.Deadline;
    CreatedAt = goal.CreatedAt;
    Deposits = goal.Deposits?.Select(d => new Deposit(d)) ?? [];
  }
}