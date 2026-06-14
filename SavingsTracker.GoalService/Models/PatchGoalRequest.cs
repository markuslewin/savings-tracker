namespace SavingsTracker.GoalService.Models;

public class PatchGoalRequest
{
  public string? Name { get; set; }
  public int? Target { get; set; }
}