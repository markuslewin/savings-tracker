namespace SavingsTracker.GoalService.Models;

public class PatchGoalRequest
{
  public string? Name { get; set; }

  public string? Target { get; set; }

  public decimal? ParsedTarget
  {
    get => Target switch
    {
      string { } s => decimal.Parse(s),
      _ => null
    };
  }
}