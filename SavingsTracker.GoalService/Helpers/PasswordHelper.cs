using Microsoft.AspNetCore.Identity;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalService.Helpers;

public static class PasswordHelper
{
  public static async Task<IdentityResult> Validate(UserManager<User> userManager, User user, string password)
  {
    var errors = new List<IdentityError>();
    var isValid = true;
    foreach (var v in userManager.PasswordValidators)
    {
      var result = await v.ValidateAsync(userManager, user, password);
      if (!result.Succeeded)
      {
        errors.AddRange(result.Errors);
        isValid = false;
      }
    }
    if (!isValid)
    {
      return IdentityResult.Failed([.. errors]);
    }
    return IdentityResult.Success;
  }
}