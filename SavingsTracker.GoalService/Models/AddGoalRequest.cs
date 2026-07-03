namespace SavingsTracker.GoalService.Models;

public class AddGoalRequest
{
  public required string Name { get; set; }
  public required string Target { get; set; }

  public decimal ParsedTarget
  {
    get => decimal.Parse(Target);
  }
}