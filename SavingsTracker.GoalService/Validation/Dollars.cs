using System.ComponentModel.DataAnnotations;

namespace SavingsTracker.GoalService.Validation;

public class DollarsAttribute : ValidationAttribute
{
  protected override ValidationResult? IsValid(
    object? value, ValidationContext validationContext)
  {
    if (value is null) return ValidationResult.Success;
    if (value is not string { } s) throw new InvalidOperationException();
    if (!decimal.TryParse(s, out var d))
      return new ValidationResult("Invalid format");
    if (d.Scale > 2) return new ValidationResult("Invalid decimals");
    return ValidationResult.Success;
  }
}