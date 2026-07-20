using System.ComponentModel.DataAnnotations;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using MimeKit;

namespace SavingsTracker.GoalService.Services;

public class SmtpEmailSender(
    IOptions<SmtpClientOptions> clientOptions,
    IOptions<SmtpFromOptions> fromOptions) : IEmailSender
{
  public async Task SendEmailAsync(
      string email, string subject, string htmlMessage)
  {
    var message = new MimeMessage();
    message.From.Add(
        new MailboxAddress(
            fromOptions.Value.Name, fromOptions.Value.Address));
    message.To.Add(new MailboxAddress(name: null, email));
    message.Subject = subject;
    message.Body = new TextPart("html")
    {
      Text = htmlMessage
    };

    using var client = new SmtpClient();
    await client.ConnectAsync(
        clientOptions.Value.Host,
        clientOptions.Value.Port ?? 587,
        useSsl: false);
    await client.AuthenticateAsync(
        clientOptions.Value.UserName, clientOptions.Value.Password);
    await client.SendAsync(message);
    await client.DisconnectAsync(quit: true);
  }
}

public class SmtpClientOptions
{
  public const string Key = "Smtp:Client";

  [Required]
  public required string Host { get; set; }
  public int? Port { get; set; }
  [Required]
  public required string UserName { get; set; }
  [Required]
  public required string Password { get; set; }
}

public class SmtpFromOptions
{
  public const string Key = "Smtp:From";

  [Required]
  public required string Name { get; set; }
  [Required]
  public required string Address { get; set; }
}