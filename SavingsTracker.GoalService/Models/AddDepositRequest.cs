using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class AddDepositRequest
{
  [Dollars]
  public string? Amount { get; set; }
  public string? Note { get; set; }

  public decimal ParsedAmount => decimal.Parse(Amount!);
  public string ParsedNote => Note!;
}

public class AddDepositRequestValidator : AbstractValidator<AddDepositRequest>
{
  public AddDepositRequestValidator()
  {
    RuleFor(r => r.Amount)
      .Cascade(CascadeMode.Stop)
      .NotNull()
      .Custom((a, ctx) =>
      {
        if (!decimal.TryParse(a, out var d))
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

    RuleFor(r => r.Note)
      .NotNull();
  }
}