import { CalendarDate } from "@internationalized/date";
import { cache } from "react";

export const getNow = cache(() => new Date());

// React can't serialize `CalendarDate` across server/client boundaries, and so we use this type when necessary
export type DateOnly = {
  year: number;
  month: number;
  day: number;
};

export const isoDateToDateOnly = (iso: string): DateOnly | null => {
  const date = new Date(iso);
  if (isNaN(+date)) return null;

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
};

export const newCalendarDate = (dateOnly: DateOnly) =>
  new CalendarDate(dateOnly.year, dateOnly.month, dateOnly.day);
