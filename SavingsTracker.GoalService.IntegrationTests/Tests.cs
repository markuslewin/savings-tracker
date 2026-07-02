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
        // Start DB container
        await _dbContainer.StartAsync(testContext.CancellationToken);
        var connectionString = _dbContainer.GetConnectionString();

        // Migrate
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

        // Seed
        using var scope = _factory!.Services.CreateScope();
        var userManager =
            scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var seeder =
            new GoalDbManager::SavingsTracker.GoalDbManager.Seeder(userManager);
        await seeder.Seed();

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
    public async Task GetGoals_AnonUser_ReturnsGoals()
    {
        var response = await _client!.GetAsync(
            "/goals?sort=RecentlyAdded", _testContext.CancellationToken);
        var goals = await response.Content.ReadFromJsonAsync<List<Models.Goal>>(
            _testContext.CancellationToken);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        Assert.IsNotEmpty(goals!);
    }

    [TestMethod]
    public async Task AnotherTest()
    {
        List<Goal> goals =
        [
            new() { Name = "My name", Deposits = [] },
            new() { Name = "My name 1", Deposits = [new () { Note = "Bla" }] },
        ];
        Assert.That.Collection(
            goals,
            goal =>
            {
                Assert.AreEqual("My name", goal.Name);
                Assert.IsEmpty(goal.Deposits);
            },
            goal =>
            {
                Assert.AreEqual("My name 1", goal.Name);
                Assert.That.Collection(goal.Deposits, deposit =>
                {
                    Assert.AreEqual("Bla", deposit.Note);
                });
            });
    }
}


public static class CustomAssertExtensions
{
    public static void Collection<T>(
        this Assert _,
        IEnumerable<T> collection,
        params IEnumerable<Action<T>> actions)
    {
        var collectionCount = collection.Count();
        var actionsCount = actions.Count();
        if (collectionCount != actionsCount)
            throw new AssertFailedException(
                $"Assert.That.Collection failed. Collection count was <{collectionCount}>, but expected <{actionsCount}>");

        foreach (var (item, action) in Enumerable.Zip(collection, actions))
        {
            action(item);
        }
    }
}