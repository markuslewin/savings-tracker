using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalService.Validation;

public class PasswordAttribute() : ValidationAttribute
{
  public PasswordOptions Options { get; set; } = new PasswordOptions();
  public PasswordValidator<User> Validator { get; set; } = new();

  protected override ValidationResult? IsValid(
    object? value, ValidationContext validationContext)
  {
    if (value is not string { } password) throw new InvalidOperationException();
    if (string.IsNullOrWhiteSpace(password)
      || password.Length < Options.RequiredLength)
      return new ValidationResult(
        Validator.Describer.PasswordTooShort(Options.RequiredLength).Description);
    if (Options.RequireNonAlphanumeric
      && password.All(Validator.IsLetterOrDigit))
      return new ValidationResult(
        Validator.Describer.PasswordRequiresNonAlphanumeric().Description);
    if (Options.RequireDigit && !password.Any(Validator.IsDigit))
      return new ValidationResult(
        Validator.Describer.PasswordRequiresDigit().Description);
    if (Options.RequireLowercase && !password.Any(Validator.IsLower))
      return new ValidationResult(
        Validator.Describer.PasswordRequiresLower().Description);
    if (Options.RequireUppercase && !password.Any(Validator.IsUpper))
      return new ValidationResult(
        Validator.Describer.PasswordRequiresUpper().Description);
    if (Options.RequiredUniqueChars >= 1
      && password.Distinct().Count() < Options.RequiredUniqueChars)
      return new ValidationResult(
        Validator
          .Describer
          .PasswordRequiresUniqueChars(Options.RequiredUniqueChars)
          .Description);
    return ValidationResult.Success;
  }
}