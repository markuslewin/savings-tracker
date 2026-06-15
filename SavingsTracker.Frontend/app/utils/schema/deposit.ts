import { floatTransform, requiredStringSchema } from "@/app/utils/form";
import z from "zod";

export const amount = requiredStringSchema.transform(floatTransform);

export const note = z.string();

export const schema = z.object({
  amount,
  note,
});
