import { formatDollars, formatPercent } from "@/app/utils/locale";
import { expect, test } from "vitest";

test.each([
  [0.009, "0%"],
  [0.01, "1%"],
  [0.1, "10%"],
  [0.999, "99%"],
  [1, "100%"],
])("formatPercent(%d) -> %s", (value, expected) => {
  expect(formatPercent(value)).toBe(expected);
});

test.each([
  [0, "$0"],
  [350, "$350"],
  [1900, "$1,900"],
  [0.1, "$0.10"],
  [0.01, "$0.01"],
])("formatDollars(%d) -> %s", (value, expected) => {
  expect(formatDollars(value)).toBe(expected);
});
