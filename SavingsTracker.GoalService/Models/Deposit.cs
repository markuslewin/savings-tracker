namespace SavingsTracker.GoalService.Models;

public class Deposit(SavingsTracker.GoalDb.Deposit deposit)
{
  public int Id { get; set; } = deposit.Id;
  public decimal Amount { get; set; } = deposit.Amount;
  public string Note { get; set; } = deposit.Note;
  public DateTimeOffset CreatedAt { get; set; } = deposit.CreatedAt;
}