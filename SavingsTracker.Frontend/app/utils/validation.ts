import * as z from "zod";

export const requiredStringSchema = z.string().refine(
  (val) => {
    return val !== "";
  },
  { error: "Required" },
);

export const validate = (schema: z.ZodType) => {
  return (value: string) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return result.error.issues.map((issue) => issue.message).join(" ");
    }
  };
};
