import { sum } from "@/app/utils/math";
import * as z from "zod";

const base = process.env.GOALSERVICE_HTTPS;
if (base === undefined) {
  throw new Error("Missing env `GOALSERVICE_HTTPS`");
}

export const getGoals = async () => {
  const response = await fetch(new URL("goals", base));
  const json = await response.json();
  const goals = z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        target: z.number(),
        deadline: z.nullable(z.coerce.date()),
        deposits: z.array(
          z.object({
            id: z.number(),
            amount: z.number(),
            note: z.string(),
            createdAt: z.coerce.date(),
          }),
        ),
      }),
    )
    .parse(json);
  return goals;
};

export const getGoal = async (id: number) => {
  const response = await fetch(new URL(`goals/${id}`, base));
  if (response.status === 404) return success(null);
  if (!response.ok) return error(new Error("Unsuccessful status code"));

  const json = await response.json();
  const goal = z
    .object({
      id: z.number(),
      name: z.string(),
      target: z.number(),
      deadline: z.nullable(z.coerce.date()),
      createdAt: z.coerce.date(),
      deposits: z.array(
        z.object({
          id: z.number(),
          amount: z.number(),
          note: z.string(),
          createdAt: z.coerce.date(),
        }),
      ),
    })
    .parse(json);
  return success(goal);
};

export const createGoal = async ({
  name,
  target,
}: {
  name: string;
  target: number;
}) => {
  const response = await fetch(new URL("goals", base), {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, target }),
  });
  if (!response.ok) return error(new Error("Unsuccessful status code"));

  const json = await response.json();
  const data = z
    .object({
      id: z.number(),
    })
    .parse(json);
  return success(data);
};

const success = <T>(data: T) => ({ success: true, data }) as const;

const error = <T>(error: T) => ({ success: false, error }) as const;

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
