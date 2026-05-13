var builder = DistributedApplication.CreateBuilder(args);

var goalService = builder.AddProject<Projects.SavingsTracker_GoalService>("goalservice");

builder
  .AddJavaScriptApp("frontend", "../SavingsTracker.Frontend")
  .WithHttpEndpoint(port: 3000, env: "PORT")
  .WithReference(goalService);

builder.Build().Run();
