var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.api>("api");

builder
  .AddJavaScriptApp("web", "../web")
  .WithHttpEndpoint(port: 3000, env: "PORT")
  .WithReference(api);

builder.Build().Run();
