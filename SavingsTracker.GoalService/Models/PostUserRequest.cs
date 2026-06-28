using System.ComponentModel.DataAnnotations;

namespace SavingsTracker.GoalService.Models;

public class PostUserRequest
{
  [Required]
  public required string FullName { get; set; }
  [Required]
  [EmailAddress]
  public required string Email { get; set; }
}