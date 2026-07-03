using System.ComponentModel.DataAnnotations;
using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class PostUserRequest
{
  public string? FullName { get; set; }
  public string? Email { get; set; }

  public string ValidFullName => FullName!;
  public string ValidEmail => Email!;
}

public class PostUserRequestValidator : AbstractValidator<PostUserRequest>
{
  public PostUserRequestValidator()
  {
    RuleFor(r => r.FullName)
      .Required();

    RuleFor(r => r.Email)
      .Required()
      .Email();
  }
}