using System.Text.Json.Serialization;

namespace SavingsTracker.GoalService.Models;

[JsonConverter(typeof(JsonStringEnumConverter<Sort>))]
public enum Sort
{
  RecentlyAdded,
  DeadlineAscending,
  ProgressDescending,
  ProgressAscending,
  AmountSavedDescending,
  AlphabeticalAscending
}
