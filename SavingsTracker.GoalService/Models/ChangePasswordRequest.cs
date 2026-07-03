using System.ComponentModel.DataAnnotations;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class ChangePasswordRequest
{
  public string? Password { get; set; }

  public string ValidPassword => Password!;
}

public class ChangePasswordRequestValidator : AbstractValidator<ChangePasswordRequest>
{
  public ChangePasswordRequestValidator(UserManager<User> userManager)
  {
    RuleFor(r => r.Password)
      .Required()
      .Password(userManager);
  }
}