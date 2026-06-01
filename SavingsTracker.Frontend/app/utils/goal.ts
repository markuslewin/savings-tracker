import { sum } from "@/app/utils/math";

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
