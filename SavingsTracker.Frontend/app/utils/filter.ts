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

export const getFilterFn = (
  filter: Filter,
): ((goal: { target: number; saved: number }) => boolean) => {
  switch (filter) {
    case "All":
      return () => true;
    case "InProgress":
      return (g) => 0 < g.saved && g.saved < g.target;
    case "Completed":
      return (g) => g.target <= g.saved;
    case "NotStarted":
      return (g) => g.saved <= 0;
    default:
      throw new Error("Not implemented");
  }
};
