using System.ComponentModel.DataAnnotations;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class AddGoalRequest
{
  [Required]
  public required string Name { get; set; }
  [Dollars]
  public required string Target { get; set; }

  public decimal ParsedTarget
  {
    get => decimal.Parse(Target);
  }
}