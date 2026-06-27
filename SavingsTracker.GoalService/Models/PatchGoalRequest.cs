using System.ComponentModel.DataAnnotations;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class PatchGoalRequest
{
  [Required(ErrorMessage = "Required")]
  public string? Name { get; set; }

  [Dollars]
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