import * as z from "zod";

export const sorts = [
  "RecentlyAdded",
  "DeadlineAscending",
  "ProgressDescending",
  "ProgressAscending",
  "AmountSavedDescending",
  "AlphabeticalAscending",
] as const;

export const sortSchema = z.enum(sorts);

export type Sort = (typeof sorts)[number];

export const getSortLabel = (sort: Sort) => {
  switch (sort) {
    case "RecentlyAdded":
      return "Recently added";
    case "DeadlineAscending":
      return "Deadline (soonest first)";
    case "ProgressDescending":
      return "Progress (highest first)";
    case "ProgressAscending":
      return "Progress (lowest first)";
    case "AmountSavedDescending":
      return "Amount saved (highest first)";
    case "AlphabeticalAscending":
      return "Alphabetical (A–Z)";
  }
};
