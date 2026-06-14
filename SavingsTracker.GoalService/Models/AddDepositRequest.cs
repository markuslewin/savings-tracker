namespace SavingsTracker.GoalService.Models;

public class AddDepositRequest
{
  public int Amount { get; set; }
  public string Note { get; set; }
}