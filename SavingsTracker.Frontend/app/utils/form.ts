import { FormProps } from "react-aria-components/Form";
import * as z from "zod";
import { $RefinementCtx } from "zod/v4/core";

type ValidationError =
  NonNullable<FormProps["validationErrors"]> extends Record<string, infer T>
    ? T | undefined
    : never;

type State<K extends string> = {
  values: Record<K, string>;
  errors?: Partial<Record<K, ValidationError>>;
};

export type FormAction<K extends string> = (
  previousState: State<K>,
  formData: FormData,
) => Promise<State<K>>;

export const requiredStringSchema = z.string().refine(
  (val) => {
    return val !== "";
  },
  { error: "Required" },
);

export const floatTransform = (val: string, ctx: $RefinementCtx<string>) => {
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
};

export const validate = (schema: z.ZodType) => {
  return (value: string) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return result.error.issues.map((issue) => issue.message).join(" ");
    }
  };
};
