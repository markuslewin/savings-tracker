import { FormProps } from "react-aria-components/Form";
import * as z from "zod";

type ValidationError =
  NonNullable<FormProps["validationErrors"]> extends Record<string, infer T>
    ? T | undefined
    : never;

export type FormState<K extends string> = {
  values: Record<K, string>;
  errors?: Partial<Record<K, ValidationError>>;
};

export type FormAction<K extends string> = (
  previousState: FormState<K>,
  formData: FormData,
) => Promise<FormState<K>>;

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
