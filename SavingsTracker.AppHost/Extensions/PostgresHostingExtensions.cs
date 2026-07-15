using SavingsTracker.AppHost.Annotations;
using SavingsTracker.AppHost.Resources;

namespace SavingsTracker.AppHost.Extensions;

public static class PostgresHostingExtensions
{
  public static IResourceBuilder<PostgresDatabaseResource> PublishAsNeonDatabase(
    this IResourceBuilder<PostgresDatabaseResource> builder)
  {
    if (builder.ApplicationBuilder.ExecutionContext.IsPublishMode)
    {
      var deployment = new NeonDeploymentResource(
        name: $"{builder.Resource.Name}-neon-deploy");

      _ = builder.ApplicationBuilder
        .AddResource(deployment)
        .WithParentRelationship(builder.Resource)
        .ExcludeFromManifest();

      builder.WithAnnotation(new NeonDeploymentAnnotation(deployment));
    }

    return builder;
  }
}