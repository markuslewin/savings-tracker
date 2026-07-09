import { isCompletedInDueTime } from "@/app/utils/goal.client";
import { CalendarDate } from "@internationalized/date";
import { expect, test } from "vitest";

test.each<[Parameters<typeof isCompletedInDueTime>[0], boolean]>([
  [
    {
      target: 1,
      deadline: new CalendarDate(2026, 7, 1),
      // Date-inclusive
      deposits: [
        { amount: 1, createdAt: new Date("2026-07-01T23:59:59.999Z") },
      ],
    },
    true,
  ],
  [
    {
      target: 1,
      deadline: new CalendarDate(2026, 7, 1),
      deposits: [{ amount: 1, createdAt: new Date("2026-07-02") }],
    },
    false,
  ],
])("isCompletedInDueTime", (goal, expected) => {
  expect(isCompletedInDueTime(goal)).toBe(expected);
});
