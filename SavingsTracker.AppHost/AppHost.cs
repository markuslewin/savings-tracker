var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder
  .AddPostgres("postgres")
  .WithPgWeb(pgWeb => pgWeb.WithHostPort(5050));
// if (builder.ExecutionContext.IsRunMode)
// {
//   postgres.WithDataVolume();
// }

var goalDb = postgres.AddDatabase("goaldb");

builder
  .AddProject<Projects.SavingsTracker_GoalDbManager>("migrations")
  .WithReference(goalDb)
  .WaitFor(goalDb);

var goalService = builder
  .AddProject<Projects.SavingsTracker_GoalService>("goalservice")
  .WithReference(goalDb);

var frontend = builder
  .AddJavaScriptApp("frontend", "../SavingsTracker.Frontend")
  .WithHttpEndpoint(port: 3000, env: "PORT")
  .WithReference(goalService);

goalService
  .WithEnvironment("FRONTEND_URL", frontend.GetEndpoint("http"));

builder.Build().Run();
