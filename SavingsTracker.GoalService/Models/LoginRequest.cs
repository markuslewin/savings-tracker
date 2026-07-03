using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class LoginRequest
{
  public string? Email { get; set; }
  public string? Password { get; set; }

  public string ValidEmail => Email!;
  public string ValidPassword => Password!;
}

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
  public LoginRequestValidator()
  {
    RuleFor(r => r.Email)
      .Required()
      .Email();

    RuleFor(r => r.Password)
      .Required();
  }
}