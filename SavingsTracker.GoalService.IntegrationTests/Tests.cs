extern alias GoalDbManager;

using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SavingsTracker.GoalDb;
using Testcontainers.PostgreSql;

namespace SavingsTracker.GoalService.IntegrationTests;

[TestClass]
public sealed class Tests
{
    private static readonly PostgreSqlContainer _dbContainer =
        new PostgreSqlBuilder("postgres:18.3").Build();

    private static CustomWebApplicationFactory<Program>? _factory;
    private static HttpClient? _client;

    private readonly TestContext _testContext;

    [ClassInitialize]
    public static async Task ClassInit(TestContext testContext)
    {
        await _dbContainer.StartAsync(testContext.CancellationToken);
        var connectionString = _dbContainer.GetConnectionString();

        var options = new DbContextOptionsBuilder<GoalDbContext>()
            .UseNpgsql(_dbContainer.GetConnectionString(), builder =>
            {
                builder.MigrationsAssembly(
                    typeof(GoalDbManager::Program).Assembly.GetName().Name);
            })
            .Options;
        using var ctx = new GoalDbContext(options);
        await ctx.Database.MigrateAsync(testContext.CancellationToken);

        _factory = new CustomWebApplicationFactory<Program>(connectionString);
        _client = _factory.CreateClient();
    }

    // We don't have to clear the database if we isolate tests by creating new users
    // [TestInitialize]
    // public async Task TestInit()
    // {
    //     using var scope = _factory!.Services.CreateScope();
    //     var ctx = scope.ServiceProvider.GetRequiredService<GoalDbContext>();

    //     ctx.RemoveRange(ctx.Users);
    //     await ctx.SaveChangesAsync(_testContext.CancellationToken);
    // }

    [ClassCleanup]
    public static async Task ClassCleanup()
    {
        _client?.Dispose();
        _factory?.Dispose();
        await _dbContainer.DisposeAsync();
    }

    public Tests(TestContext testContext)
    {
        _testContext = testContext;
    }

    [TestMethod]
    public async Task GetGoals_AnonUser_ReturnsDemoGoals()
    {
        using var scope = _factory!.Services.CreateScope();
        var userManager =
            scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        await userManager.CreateAsync(new User
        {
            UserName = "Demo",
            FullName = "Demo",
            IsDemo = true,
            Goals = [new() { Name = "Test", Target = 100, Deposits = [] }]
        });

        var response = await _client!.GetAsync(
            "/goals?sort=RecentlyAdded", _testContext.CancellationToken);
        var goals = await response.Content.ReadFromJsonAsync<List<Models.Goal>>(
            _testContext.CancellationToken);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.HasCount(1, goals!);
        Assert.AreEqual("Test", goals![0].Name);
        Assert.AreEqual(100, goals![0].Target);
    }
}
