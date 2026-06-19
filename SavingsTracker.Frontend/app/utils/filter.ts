import * as z from "zod";

export const filters = [
  "All",
  "InProgress",
  "Completed",
  "NotStarted",
] as const;

export const filterSchema = z.enum(filters);

export type Filter = z.infer<typeof filterSchema>;

export const getFilterLabel = (filter: Filter) => {
  switch (filter) {
    case "All":
      return "All goals";
    case "InProgress":
      return "In progress";
    case "Completed":
      return "Completed";
    case "NotStarted":
      return "Not started";
    default:
      throw new Error("Not implemented");
  }
};
