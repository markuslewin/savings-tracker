using System.Text.Json.Serialization;

namespace SavingsTracker.GoalService.Models;

[JsonConverter(typeof(JsonStringEnumConverter<Filter>))]
public enum Filter
{
  All,
  InProgress,
  Completed,
  NotStarted
}
