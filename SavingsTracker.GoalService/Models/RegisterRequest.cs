using System.ComponentModel.DataAnnotations;
using SavingsTracker.GoalService.Validation;

namespace SavingsTracker.GoalService.Models;

public class RegisterRequest
{
  [Required]
  public required string FullName { get; set; }
  [Required]
  [EmailAddress]
  public required string Email { get; set; }
  [Password]
  public required string Password { get; set; }
}