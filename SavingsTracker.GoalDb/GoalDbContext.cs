using Microsoft.EntityFrameworkCore;

namespace SavingsTracker.GoalDb;

public class GoalDbContext(DbContextOptions<GoalDbContext> options) : DbContext(options)
{
  public DbSet<Goal> Goals { get; set; }
}