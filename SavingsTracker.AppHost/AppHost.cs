using SavingsTracker.AppHost.Extensions;

var builder = DistributedApplication.CreateBuilder(args);

#pragma warning disable ASPIREPIPELINES001
builder.Pipeline.AddNetlifyDeployPipeline();
builder.Pipeline.AddNeonDeployPipeline();
#pragma warning restore ASPIREPIPELINES001

var postgres = builder
  .AddPostgres("postgres")
  .WithPgWeb(pgWeb => pgWeb.WithHostPort(5050));

var goalDb = postgres
  .AddDatabase("goaldb")
  .PublishAsNeonDatabase();

builder
  .AddProject<Projects.SavingsTracker_GoalDbManager>("migrations")
  .WithReference(goalDb)
  .WaitFor(goalDb);

var goalService = builder
  .AddProject<Projects.SavingsTracker_GoalService>("goalservice")
  .WithReference(goalDb);

builder
  .AddJavaScriptApp("frontend", "../SavingsTracker.Frontend")
  .WithHttpEndpoint(port: 3000, env: "PORT")
  .WithReference(goalService)
  .PublishAsNetlifySite(new NetlifyDeployOptions
  {
    Dir = ".next",
    NoBuild = false,
    Prod = true,
  });

builder.Build().Run();
