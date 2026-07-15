using Aspire.Hosting.Pipelines;
using SavingsTracker.AppHost.Resources;

namespace SavingsTracker.AppHost.Extensions;

public static class NeonDistributedApplicationPipelineExtensions
{
#pragma warning disable ASPIREPIPELINES001
  public static IDistributedApplicationPipeline AddNeonDeployPipeline(this IDistributedApplicationPipeline pipeline)
  {
    pipeline.AddStep("deploy-neon-database", async (context) =>
    {
      var deployments = context.Model.Resources.OfType<NeonDeploymentResource>();
      foreach (var deployment in deployments)
      {
        Console.WriteLine($"Deploying Neon database! Name: {deployment.Name}");
        // todo
        // create project, wait for operations to resolve
        // send back connection string...
        // deployment
      }
    }, requiredBy: WellKnownPipelineSteps.Deploy);

    return pipeline;
  }
#pragma warning restore ASPIREPIPELINES001
}