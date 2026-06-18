import { getDepositsByMonth } from "@/app/(main)/utils/deposits";
import { expect, test } from "vitest";

const now = new Date("2026-06-18T22:00");

test("no deposits", () => {
  expect(getDepositsByMonth(now, [])).toStrictEqual({
    type: "empty",
  } satisfies ReturnType<typeof getDepositsByMonth>);
});

test("doesn't count deposits outside of interval", () => {
  expect(
    getDepositsByMonth(now, [
      { amount: 1, createdAt: new Date("2025-06-30T23:59:59.999") },
      { amount: 1, createdAt: new Date("2026-07-01T00:00") },
    ]),
  ).toStrictEqual({
    type: "empty",
  } satisfies ReturnType<typeof getDepositsByMonth>);
});

test("doesn't count deposits outside of interval due to offsets", () => {
  expect(
    getDepositsByMonth(now, [
      { amount: 1, createdAt: new Date("2025-07-01T00:59:59.999+01:00") },
      { amount: 1, createdAt: new Date("2026-06-30T23:00-01:00") },
    ]),
  ).toStrictEqual({
    type: "empty",
  } satisfies ReturnType<typeof getDepositsByMonth>);
});

test("sums deposits inside the same month", () => {
  expect(
    getDepositsByMonth(now, [
      { amount: 1, createdAt: new Date("2026-06-01") },
      { amount: 2, createdAt: new Date("2026-06-02") },
      { amount: 3, createdAt: new Date("2026-06-30") },
    ]),
  ).toStrictEqual({
    type: "deposits",
    values: [
      {
        month: new Date("2025-07-01"),
        amount: 0,
      },
      {
        month: new Date("2025-08-01"),
        amount: 0,
      },
      {
        month: new Date("2025-09-01"),
        amount: 0,
      },
      {
        month: new Date("2025-10-01"),
        amount: 0,
      },
      {
        month: new Date("2025-11-01"),
        amount: 0,
      },
      {
        month: new Date("2025-12-01"),
        amount: 0,
      },
      {
        month: new Date("2026-01-01"),
        amount: 0,
      },
      {
        month: new Date("2026-02-01"),
        amount: 0,
      },
      {
        month: new Date("2026-03-01"),
        amount: 0,
      },
      {
        month: new Date("2026-04-01"),
        amount: 0,
      },
      {
        month: new Date("2026-05-01"),
        amount: 0,
      },
      {
        month: new Date("2026-06-01"),
        amount: 6,
      },
    ],
  } satisfies ReturnType<typeof getDepositsByMonth>);
});
