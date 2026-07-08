using FluentValidation;
using Microsoft.VisualBasic;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class AddGoalRequest
{
  public string? Name { get; set; }
  public string? Target { get; set; }
  public string? Deadline { get; set; }

  public string ValidName => Name!;
  public decimal ValidTarget
  {
    get => decimal.Parse(Target!);
  }
  public DateOnly? ValidDeadline => string.IsNullOrWhiteSpace(Deadline)
    ? null
    : DateOnly.Parse(Deadline);
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

    RuleFor(r => r.Deadline)
      .NotNull()
      .NullableDateTime();
  }
}