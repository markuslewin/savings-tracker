using Microsoft.AspNetCore.Identity;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalDbManager;

public class Seeder(UserManager<User> userManager)
{
  private readonly UserManager<User> _userManager = userManager;

  public async Task Seed()
  {
    var data = SeedDataReader.Read();

    var name = "Demo";
    var user = new User
    {
      UserName = name,
      IsDemo = true,
      FullName = name,
      Goals = [..data is null || data.Goals is null
        ? []
        : data.Goals.Select(g => new GoalDb.Goal
        {
          Name = g.Name
            ?? throw new NullReferenceException(nameof(g.Name)),
          Target = g.Target,
          Deadline = g.Deadline,
          CreatedAt = g.CreatedAt,
          Deposits = g.Deposits is null
            ? throw new NullReferenceException(nameof(g.Deposits))
            : [..g.Deposits.Select(d => new GoalDb.Deposit
            {
              Amount = d.Amount,
              Note = d.Note
                ?? throw new NullReferenceException(nameof(d.Note)),
              CreatedAt = d.CreatedAt
            })]
        })]
    };
    var result = await _userManager.CreateAsync(user);
    if (!result.Succeeded) throw new Exception(result.ToString());
  }
}