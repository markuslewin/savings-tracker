extern alias GoalDbManager;

using System.Net;
using System.Net.Http.Json;
using Bogus;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalService.Models;
using Testcontainers.PostgreSql;

namespace SavingsTracker.GoalService.IntegrationTests;

[TestClass]
public sealed class Tests
{
    private static readonly PostgreSqlContainer _dbContainer =
        new PostgreSqlBuilder("postgres:18.3").Build();
    private static readonly Faker _faker = new();
    private static readonly string _validPassword = "P@ssw0rd";

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

    private async Task SignIn(
        HttpClient client,
        string email,
        string password)
    {
        await client.PostAsJsonAsync("/accounts/register", new RegisterRequest
        {
            FullName = _faker.Person.FullName,
            Email = email,
            Password = password
        }, _testContext.CancellationToken);
        await client.PostAsJsonAsync("/accounts/login", new LoginRequest
        {
            Email = email,
            Password = password
        }, _testContext.CancellationToken);
    }

    [TestMethod]
    public async Task PostDeposit_InvalidData_ReturnsValidationProblem()
    {
        var email = _faker.Person.Email;
        using var client = _factory!.CreateClient();
        await SignIn(client, email, _validPassword);

        var response = await client.PostAsJsonAsync(
            "/goals/1/deposits",
            new AddDepositRequest { Amount = "100.101", Note = "" },
            _testContext.CancellationToken);

        var details = await response.Content
            .ReadFromJsonAsync<HttpValidationProblemDetails>(
                _testContext.CancellationToken);
        details!.Errors.TryGetValue("amount", out var amountErrors);

        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.IsNotNull(amountErrors);
        Assert.That.Collection(
            amountErrors,
            e =>
            {
                Assert.AreEqual("Invalid decimals", e);
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