using System.ComponentModel.DataAnnotations;

namespace SavingsTracker.GoalService.Models;

public class ChangePasswordRequest
{
  [Required]
  public required string Password { get; set; }
}