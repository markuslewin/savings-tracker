import z from "zod";

export const goalSchema = z.object({
  name: z.string(),
  target: z.string(),
  deadline: z.string(),
});

export const depositSchema = z.object({
  amount: z.string(),
  note: z.string(),
});
