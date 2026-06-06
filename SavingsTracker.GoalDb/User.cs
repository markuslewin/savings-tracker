using Microsoft.AspNetCore.Identity;

namespace SavingsTracker.GoalDb;

public class User : IdentityUser
{
  public bool IsDemo { get; set; } = false;
  public string FullName { get; set; }

  public ICollection<Goal> Goals { get; set; }
}