using FluentValidation;
using Microsoft.AspNetCore.Identity;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalService.Validation;

public static class CustomValidators
{
  public static IRuleBuilderOptions<T, string?> Required<T>(
    this IRuleBuilder<T, string?> builder)
  {
    return builder
      .NotEmpty()
      .WithMessage("Required");
  }

  public static IRuleBuilderOptions<T, string?> Email<T>(
    this IRuleBuilder<T, string?> builder)
  {
    return builder
      .EmailAddress()
      .WithMessage("Invalid format");
  }

  public static IRuleBuilderOptionsConditions<T, string?> Dollars<T>(
    this IRuleBuilder<T, string?> builder)
  {
    return builder.Custom((val, ctx) =>
      {
        if (!decimal.TryParse(val, out var d))
        {
          ctx.AddFailure("Invalid format");
          return;
        }
        if (d.Scale > 2)
        {
          ctx.AddFailure("Invalid decimals");
          return;
        }
      });
  }

  public static IRuleBuilderOptionsConditions<T, string?> Password<T>(
    this IRuleBuilder<T, string?> builder,
    UserManager<User> userManager)
  {
    return builder.CustomAsync(async (password, ctx, cancellationToken) =>
      {
        foreach (var validator in userManager.PasswordValidators)
        {
          // `user` isn't used in default validators
          var result = await validator.ValidateAsync(userManager, null!, password);
          if (!result.Succeeded)
          {
            ctx.AddFailure(result.Errors.First().Description);
            return;
          }
        }
      });
  }

  public static IRuleBuilderOptionsConditions<T, string?> NullableDateTime<T>(
    this IRuleBuilder<T, string?> builder)
  {
    return builder.Custom((val, ctx) =>
      {
        if (!string.IsNullOrWhiteSpace(val)
          && !DateOnly.TryParse(val, out var dateOnly))
        {
          ctx.AddFailure("Invalid format");
          return;
        }
      });
  }
}