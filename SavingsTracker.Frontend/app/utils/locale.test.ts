import { formatCents, formatPercent } from "@/app/utils/locale";
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
  [35000, "$350"],
  [190000, "$1,900"],
  [10, "$0.10"],
  [1, "$0.01"],
])("formatCents(%d) -> %s", (value, expected) => {
  expect(formatCents(value)).toBe(expected);
});
