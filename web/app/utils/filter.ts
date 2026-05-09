import * as z from "zod";

export const filters = [
  "all",
  "in-progress",
  "completed",
  "not-started",
] as const;

export const filterSchema = z.enum(filters);

export type Filter = (typeof filters)[number];
