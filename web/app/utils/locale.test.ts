import { formatUsd, formatPercent } from "@/app/utils/locale";
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

// Design doesn't display cents, but app allows cents as input
// Display cents for consistency
test.each([
  [0, "$0.00"],
  [350, "$350.00"],
  [1900, "$1,900.00"],
  [0.1, "$0.10"],
])("formatUsd(%d) -> %s", (value, expected) => {
  expect(formatUsd(value)).toBe(expected);
});
