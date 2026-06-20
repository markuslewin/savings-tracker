import { centsSchema } from "@/app/utils/currency";
import z from "zod";

export const amount = centsSchema;

export const note = z.string();

export const schema = z.object({
  amount,
  note,
});
