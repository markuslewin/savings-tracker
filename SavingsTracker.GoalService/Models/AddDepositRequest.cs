using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class AddDepositRequest
{
  [Dollars]
  public required string Amount { get; set; }
  public required string Note { get; set; }

  public decimal ParsedAmount
  {
    get => decimal.Parse(Amount);
  }
}