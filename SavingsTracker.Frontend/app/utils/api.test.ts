import { parseValidationProblem } from "@/app/utils/api";
import { expect, test } from "vitest";

test("parseValidationProblem: all keys don't have to be included in json", () => {
  expect(parseValidationProblem(["a", "b"], { errors: { a: ["error"] } }));
});
