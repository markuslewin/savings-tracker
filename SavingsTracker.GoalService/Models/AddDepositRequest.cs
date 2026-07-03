using FluentValidation;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class AddDepositRequest
{
  public string? Amount { get; set; }
  public string? Note { get; set; }

  public decimal ValidAmount => decimal.Parse(Amount!);
  public string ValidNote => Note!;
}

public class AddDepositRequestValidator : AbstractValidator<AddDepositRequest>
{
  public AddDepositRequestValidator()
  {
    RuleFor(r => r.Amount)
      .Required()
      .Dollars();

    RuleFor(r => r.Note)
      .NotNull();
  }
}