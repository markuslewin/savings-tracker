import { centsSchema } from "@/app/utils/currency";
import { requiredStringSchema } from "@/app/utils/form";
import z from "zod";

export const name = requiredStringSchema;

export const target = centsSchema;

export const schema = z.object({
  name,
  target,
});
