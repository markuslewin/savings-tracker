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

// [
//   "Recently added",
//   "Deadline (soonest first)",
//   "Progress (highest first)",
//   "Progress (lowest first)",
//   "Amount saved (highest first)",
//   "Alphabetical (A–Z)",
// ];
