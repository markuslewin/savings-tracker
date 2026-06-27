import { Big } from "@/app/utils/big";
import { requiredStringSchema } from "@/app/utils/form";
import { maxInt } from "@/app/utils/postgres";
import * as z from "zod";

// Dollar string to integer cents
export const centsSchema = requiredStringSchema
  .transform((val, ctx) => {
    try {
      return toCents(val);
    } catch (err) {
      ctx.issues.push({
        code: "custom",
        input: val,
        message:
          err instanceof Error ? getErrorMessage(err.message) : undefined,
      });
    }
  })
  .pipe(
    z
      .number()
      .int("Invalid decimals")
      .positive("Number must be positive")
      .lte(maxInt, "Number is too large"),
  );

// https://mikemcl.github.io/big.js/#Errors
const getErrorMessage = (message: string) => {
  if (/^\[big\.js\]/i.test(message)) {
    return "Invalid value";
  }
  return undefined;
};

const toCents = (dollars: string) => {
  return new Big(dollars).mul("100").toNumber();
};

export const toDollarValue = (value: number) => {
  return value.toFixed(2);
};
