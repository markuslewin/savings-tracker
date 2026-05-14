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
  "goaldb", configureDbContextOptions: options =>
{
  options.UseSeeding((context, _) =>
  {
    if (context is not GoalDbContext db)
    {
      throw new Exception($"Invalid context type: {context.GetType().Name}");
    }

    db.Goals.AddRange([
       new () {Name = "Demo", Target = 1000}
    ]);
    db.SaveChanges();
  });
});

var host = builder.Build();
host.Run();
