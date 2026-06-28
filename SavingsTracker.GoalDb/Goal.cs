using System.ComponentModel.DataAnnotations;

namespace SavingsTracker.GoalDb;

public class Goal
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public decimal Target { get; set; }
  public DateOnly? Deadline { get; set; }

  public DateTimeOffset CreatedAt { get; set; }

  [Required]
  public string? UserId { get; set; }
  public User? User { get; set; }
  public required ICollection<Deposit> Deposits { get; set; }
}
