using Microsoft.EntityFrameworkCore;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalDbManager;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

builder
    .Services
    .AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<GoalDbContext>();

// builder.Services.AddOpenTelemetry().WithTracing(tracing =>
// {
//   // tracing.AddSource();
// });

builder.AddNpgsqlDbContext<GoalDbContext>(
  "goaldb", configureDbContextOptions: optionsBuilder =>
{
  optionsBuilder.UseNpgsql(npgsqlBuilder =>
  {
    npgsqlBuilder.MigrationsAssembly(typeof(Program).Assembly.GetName().Name);
  });
});

var host = builder.Build();
host.Run();
