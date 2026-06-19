using System.Text.Json.Serialization;

namespace SavingsTracker.GoalService.Models;

[JsonConverter(typeof(JsonStringEnumConverter<Filter>))]
public enum Sort
{
  RecentlyAdded,
  DeadlineAscending,
  ProgressDescending,
  ProgressAscending,
  AmountSavedDescending,
  AlphabeticalAscending
}
