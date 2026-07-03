using FluentValidation;

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
}