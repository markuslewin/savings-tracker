import { sum } from "@/app/utils/math";
import * as z from "zod";

const base = process.env.GOALSERVICE_HTTPS;
if (base === undefined) {
  throw new Error("Missing env `GOALSERVICE_HTTPS`");
}

export const getGoals = async () => {
  const response = await fetch(new URL("goals", base));
  const json = await response.json();
  const parsed = z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        target: z.number(),
        deadline: z.nullable(z.coerce.date()),
        deposits: z.array(
          z.object({
            id: z.string(),
            amount: z.number(),
            note: z.string(),
            createdAt: z.coerce.date(),
          }),
        ),
      }),
    )
    .parse(json);
  return parsed;
};

export const isActive = ({
  target,
  saved,
}: {
  target: number;
  saved: number;
}) => saved < target;

export const isCompleted = ({
  target,
  saved,
}: {
  target: number;
  saved: number;
}) => saved >= target;

export const addSaved = <T extends { deposits: { amount: number }[] }>(
  goals: T[],
) =>
  goals.map((g) => ({
    ...g,
    saved: sum(g.deposits.map((d) => d.amount)),
  }));
