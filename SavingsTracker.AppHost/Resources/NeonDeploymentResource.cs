namespace SavingsTracker.AppHost.Resources;

// PostgresDatabaseResource, NeonDeployOptions
public class NeonDeploymentResource(string name) : IResourceWithConnectionString
{
  public ReferenceExpression ConnectionStringExpression => throw new NotImplementedException();

  public string Name => name;

  public ResourceAnnotationCollection Annotations => [];

  // private readonly PostgresDatabaseResource _postgresResource = postgresResource;
}