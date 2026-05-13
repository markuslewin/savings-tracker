var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder
  .AddPostgres("postgres")
  // .WithPgAdmin(pgAdmin =>
  // {
  //   pgAdmin.WithHostPort(5050);
  // })
  ;
// if (builder.ExecutionContext.IsRunMode)
// {
//   postgres.WithDataVolume();
// }

var goalDb = postgres.AddDatabase("goaldb");

var goalService = builder
  .AddProject<Projects.SavingsTracker_GoalService>("goalservice")
  .WithReference(goalDb);

builder
  .AddJavaScriptApp("frontend", "../SavingsTracker.Frontend")
  .WithHttpEndpoint(port: 3000, env: "PORT")
  .WithReference(goalService);

builder.Build().Run();
