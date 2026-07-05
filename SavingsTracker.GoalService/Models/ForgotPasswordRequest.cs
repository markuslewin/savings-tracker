using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class ForgotPasswordRequest
{
  public string? Email { get; set; }

  public string ValidEmail => Email!;
}

public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
  public ForgotPasswordRequestValidator()
  {
    RuleFor(r => r.Email)
      .Required()
      .Email();
  }
}