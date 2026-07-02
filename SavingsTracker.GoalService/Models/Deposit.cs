namespace SavingsTracker.GoalService.Models;

public class Deposit
{
  public int Id { get; set; }
  public decimal Amount { get; set; }
  public string Note { get; set; }
  public DateTimeOffset CreatedAt { get; set; }

  public Deposit() { }

  public Deposit(GoalDb.Deposit deposit)
  {
    Id = deposit.Id;
    Amount = deposit.Amount;
    Note = deposit.Note;
    CreatedAt = deposit.CreatedAt;
  }
}