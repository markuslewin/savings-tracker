#:package Aspire.Hosting.JavaScript@13.2.4
#:sdk Aspire.AppHost.Sdk@13.2.4

var builder = DistributedApplication.CreateBuilder(args);

builder
  .AddJavaScriptApp("web", "./web")
  .WithHttpEndpoint(env: "PORT");

builder.Build().Run();
