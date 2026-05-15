using Microsoft.EntityFrameworkCore;
using SavingsTracker.GoalDb;
using SavingsTracker.GoalDbManager;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

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
  optionsBuilder.UseSeeding((context, _) =>
  {
    if (context is not GoalDbContext db)
    {
      throw new Exception($"Invalid context type: {context.GetType().Name}");
    }

    Seeder.Seed(db);
  });
});

var host = builder.Build();
host.Run();
