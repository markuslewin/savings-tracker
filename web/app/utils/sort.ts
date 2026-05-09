import * as z from "zod";

export const sorts = [
  "recently-added",
  "deadline-asc",
  "progress-desc",
  "progress-asc",
  "amount-desc",
  "alphabetical-asc",
] as const;

export const sortSchema = z.enum(sorts);

export type Sort = (typeof sorts)[number];

export const getSortLabel = (sort: Sort) => {
  switch (sort) {
    case "recently-added":
      return "Recently added";
    case "deadline-asc":
      return "Deadline (soonest first)";
    case "progress-desc":
      return "Progress (highest first)";
    case "progress-asc":
      return "Progress (lowest first)";
    case "amount-desc":
      return "Amount saved (highest first)";
    case "alphabetical-asc":
      return "Alphabetical (A–Z)";
  }
};
