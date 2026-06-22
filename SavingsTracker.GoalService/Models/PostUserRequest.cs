namespace SavingsTracker.GoalService.Models;

public class PostUserRequest
{
  public required string FullName { get; set; }
  public required string Email { get; set; }
}