using SavingsTracker.AppHost.Resources;

namespace SavingsTracker.AppHost.Annotations;

public class NeonDeploymentAnnotation(NeonDeploymentResource deployment)
  : IResourceAnnotation
{
  public NeonDeploymentResource Resource => deployment;
}