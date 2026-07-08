using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class PatchGoalRequest
{
  public string? Name { get; set; }
  public string? Target { get; set; }
  public string? Deadline { get; set; }

  public decimal? ValidTarget
  {
    get => Target switch
    {
      string s => decimal.Parse(s),
      _ => null
    };
  }
  public DateOnly? ValidDeadline => string.IsNullOrWhiteSpace(Deadline)
    ? null
    : DateOnly.Parse(Deadline);
}

public class PatchGoalRequestValidator : AbstractValidator<PatchGoalRequest>
{
  public PatchGoalRequestValidator()
  {
    RuleFor(r => r.Name)
      .Required()
      .When(r => r.Name is not null);

    RuleFor(r => r.Target)
      .Required()
      .Dollars()
      .When(r => r.Target is not null);

    RuleFor(r => r.Deadline)
      .NotNull()
      .NullableDateTime()
      .When(r => r.Deadline is not null);
  }
}