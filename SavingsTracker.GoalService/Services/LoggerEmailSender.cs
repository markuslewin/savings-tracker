using Microsoft.AspNetCore.Identity.UI.Services;

namespace SavingsTracker.GoalService.Services;

public class LoggerEmailSender(ILogger<LoggerEmailSender> logger) : IEmailSender
{
  public async Task SendEmailAsync(
    string email, string subject, string htmlMessage)
  {
    logger.LogInformation("Sending email {Email}", new
    {
      email,
      subject,
      htmlMessage
    });
  }
}