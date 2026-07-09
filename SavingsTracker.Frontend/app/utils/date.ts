import { cache } from "react";

export const getNow = cache(() => new Date());

export const getDatePart = (date: Date): string | undefined => {
  return date.toISOString().split("T")[0];
};
