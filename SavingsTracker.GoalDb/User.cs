using Microsoft.AspNetCore.Identity;

namespace SavingsTracker.GoalDb;

public class User : IdentityUser
{
  public string FullName { get; set; }

  public ICollection<Goal> Goals { get; set; }
}