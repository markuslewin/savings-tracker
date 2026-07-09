import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

// Dependent on user's time zone
// Must only run in the browser
export const isCompletedInDueTime = ({
  target,
  deadline,
  deposits,
}: {
  target: number;
  deadline: CalendarDate;
  deposits: { amount: number; createdAt: Date }[];
}) => {
  const sortedDeposits = deposits.toSorted(
    (a, b) => +a.createdAt - +b.createdAt,
  );
  let saved = 0;
  for (const d of sortedDeposits) {
    saved += d.amount;
    if (saved >= target) {
      return d.createdAt < deadline.add({ days: 1 }).toDate(getLocalTimeZone());
    }
  }
  return false;
};
