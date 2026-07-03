using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class AddGoalRequest
{
  public required string Name { get; set; }
  public required string Target { get; set; }

  public decimal ValidTarget
  {
    get => decimal.Parse(Target);
  }
}

public class AddGoalRequestValidator : AbstractValidator<AddGoalRequest>
{
  public AddGoalRequestValidator()
  {
    RuleFor(r => r.Name)
      .Required();

    RuleFor(r => r.Target)
      .Required()
      .Dollars();
  }
}