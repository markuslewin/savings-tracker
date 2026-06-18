import { Deposit } from "@/app/utils/api";
import { eachMonthOfInterval, startOfMonth, subMonths } from "date-fns";

export const getDepositsByMonth = (
  now: Date,
  deposits: Pick<Deposit, "amount" | "createdAt">[],
) => {
  const months = eachMonthOfInterval({
    start: subMonths(now, 11),
    end: now,
  });
  const amountByMonth = new Map(months.map((m) => [m.getTime(), 0]));
  let empty = true;
  for (const d of deposits) {
    const month = startOfMonth(d.createdAt).getTime();
    const amount = amountByMonth.get(month);
    if (amount === undefined) continue;
    amountByMonth.set(month, amount + d.amount);
    empty = false;
  }

  if (empty) return { type: "empty" } as const;
  return {
    type: "deposits",
    values: amountByMonth
      .entries()
      .toArray()
      .sort(([a], [b]) => a - b)
      .map(([month, amount]) => ({ month: new Date(month), amount })),
  } as const;
};
