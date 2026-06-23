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
    saved: getSaved(g),
  }));

export const getSaved = (goal: { deposits: { amount: number }[] }) =>
  sum(goal.deposits.map((d) => d.amount));

export const getRemaining = (goal: { target: number; saved: number }) =>
  Math.max(0, goal.target - goal.saved);

export const getProgress = (goal: { target: number; saved: number }) =>
  Math.min(1, goal.saved / goal.target);
