import { getInitial } from "@/app/(main)/utils/avatar";
import { expect, test } from "vitest";

// We've only got space for 2 characters and I'm not doing this
test.each([
  ["", ""],
  ["Sonya O'Connell", "S"],
  ["Tiffany Herzog", "T"],
  ["Sydney Ferry-Bartoletti", "S"],
  ["123", "1"],
  ["   ", ""],
  ["\tDaniel Parker", "D"],
])("getInitial(%s) -> %s", (fullName, expected) => {
  expect(getInitial(fullName)).toBe(expected);
});
