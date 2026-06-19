using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SavingsTracker.GoalDb;

public class GoalDbContext(
  DbContextOptions<GoalDbContext> options)
    : IdentityDbContext<User>(options)
{
  public DbSet<Goal> Goals { get; set; }
  public DbSet<Deposit> Deposits { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);
    builder
      .Entity<Goal>()
      .Property(e => e.CreatedAt)
      .HasDefaultValueSql("now()");
    builder
      .Entity<Deposit>()
      .Property(e => e.CreatedAt)
      .HasDefaultValueSql("now()");
  }
}