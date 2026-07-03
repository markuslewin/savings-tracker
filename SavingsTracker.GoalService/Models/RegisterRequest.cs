using FluentValidation;
using Microsoft.AspNetCore.Identity;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class RegisterRequest
{
  public string? FullName { get; set; }
  public string? Email { get; set; }
  public string? Password { get; set; }

  public string ValidFullName => FullName!;
  public string ValidEmail => Email!;
  public string ValidPassword => Password!;
}

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
  public RegisterRequestValidator(UserManager<User> userManager)
  {
    RuleFor(r => r.FullName)
      .Required();

    RuleFor(r => r.Email)
      .Required()
      .Email();

    RuleFor(r => r.Password)
      .Required()
      .Password(userManager);
  }
}
