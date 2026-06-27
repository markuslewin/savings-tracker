import z from "zod";

export const name = z.string();

export const target = z.string();

export const schema = z.object({
  name: z.string(),
  target: z.string(),
});
