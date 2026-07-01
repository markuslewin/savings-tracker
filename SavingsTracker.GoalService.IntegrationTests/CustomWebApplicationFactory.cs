using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace SavingsTracker.GoalService.IntegrationTests;

public class CustomWebApplicationFactory<TProgram>(string connectionString)
  : WebApplicationFactory<TProgram> where TProgram : class
{
  protected override IHost CreateHost(IHostBuilder builder)
  {
    // https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-10.0&pivots=mstest#customize-the-webapplicationfactory-with-test-configurations
    builder.ConfigureHostConfiguration(builder =>
    {
      builder.AddInMemoryCollection([new("ConnectionStrings:goaldb", connectionString)]);
    });
    return base.CreateHost(builder);
  }
}