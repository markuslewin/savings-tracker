using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class PatchGoalRequest
{
  public string? Name { get; set; }

  public string? Target { get; set; }

  public decimal? ValidTarget
  {
    get => Target switch
    {
      string s => decimal.Parse(s),
      _ => null
    };
  }
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
  }
}