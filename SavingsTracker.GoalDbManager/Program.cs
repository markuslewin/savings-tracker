using Microsoft.AspNetCore.Identity;
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

// todo: Common service
builder.Services.Configure<IdentityOptions>(options =>
{
  options.Password.RequireDigit = false;
  options.Password.RequiredLength = 8;
  options.Password.RequiredUniqueChars = 1;
  options.Password.RequireLowercase = false;
  options.Password.RequireNonAlphanumeric = false;
  options.Password.RequireUppercase = false;
});

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
