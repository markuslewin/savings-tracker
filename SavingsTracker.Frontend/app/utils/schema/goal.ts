import { requiredStringSchema } from "@/app/utils/form";
import z from "zod";

export const name = requiredStringSchema;
export const target = requiredStringSchema.transform((val, ctx) => {
  const parsed = Number.parseFloat(val);
  if (Number.isNaN(parsed)) {
    ctx.issues.push({
      code: "custom",
      input: val,
      message: "Not a number",
    });
    return z.NEVER;
  }
  return parsed;
});

export const schema = z.object({
  name,
  target,
});
