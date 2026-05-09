import * as z from "zod";

export const filters = [
  "all",
  "in-progress",
  "completed",
  "not-started",
] as const;

export const filterSchema = z.enum(filters);

export type Filter = (typeof filters)[number];

export const getFilterLabel = (filter: Filter) => {
  switch (filter) {
    case "all":
      return "All goals";
    case "in-progress":
      return "In progress";
    case "completed":
      return "Completed";
    case "not-started":
      return "Not started";
    default:
      throw new Error("Not implemented");
  }
};
