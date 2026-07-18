using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SavingsTracker.GoalDb;

namespace SavingsTracker.GoalDbManager;

public class Worker(
    IServiceProvider serviceProvider,
    IHostApplicationLifetime hostApplicationLifetime,
    ILogger<Worker> logger,
    IConfiguration configuration
) : BackgroundService
{
    public const string ActivitySourceName = "Migrations";
    private static readonly ActivitySource _activitySource = new(ActivitySourceName);

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var activity = _activitySource.StartActivity(
            "Migrating database", ActivityKind.Client);

        try
        {
            var data = SeedDataReader.Read();

            using var scope = serviceProvider.CreateScope();
            var ctx = scope.ServiceProvider.GetRequiredService<GoalDbContext>();
            ctx.Database.Migrate();

            var user = await ctx.Users.FirstOrDefaultAsync(u => u.IsDemo,
                cancellationToken);
            if (user is null)
            {
                var userManager =
                    scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var name = "Demo";
                var newUser = new User
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
                var result = await userManager.CreateAsync(newUser);
                if (!result.Succeeded) throw new Exception(result.ToString());
            }

            var testEmail = configuration.GetValue<string?>("Frontend:TestUser:Email");
            var testPassword = configuration.GetValue<string?>("Frontend:TestUser:Password");
            if (!string.IsNullOrWhiteSpace(testEmail)
                && !string.IsNullOrWhiteSpace(testPassword))
            {
                var testUser = await ctx.Users.FirstOrDefaultAsync(
                    u => u.Email == testEmail, cancellationToken);
                if (testUser is null)
                {
                    var userManager =
                        scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                    var newUser = new User
                    {
                        UserName = testEmail,
                        Email = testEmail,
                        FullName = "Test",
                    };
                    var result = await userManager.CreateAsync(newUser, testPassword);
                    if (!result.Succeeded) throw new Exception(result.ToString());
                }
            }
        }
        catch (Exception ex)
        {
            activity?.AddException(ex);
            throw;
        }

        hostApplicationLifetime.StopApplication();
    }
}
