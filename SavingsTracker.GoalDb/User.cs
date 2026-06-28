using Microsoft.AspNetCore.Identity;

namespace SavingsTracker.GoalDb;

public class User : IdentityUser
{
  public bool IsDemo { get; set; } = false;

  // We can't use `require` here because `User` must satisfy the `new()` constraint from `AddIdentityEndpoints<TUser>`
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
  public string FullName { get; set; }
  public ICollection<Goal> Goals { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

}