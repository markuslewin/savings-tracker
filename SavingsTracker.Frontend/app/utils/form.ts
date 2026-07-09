import { FormProps } from "react-aria-components/Form";

type ValidationError =
  NonNullable<FormProps["validationErrors"]> extends Record<string, infer T>
    ? T | undefined
    : never;

export type FormState<K extends string> = {
  values: Record<K, string | undefined>;
  errors?: Partial<Record<K, ValidationError>>;
};

export type FormAction<K extends string> = (
  previousState: FormState<K>,
  formData: FormData,
) => Promise<FormState<K>>;
