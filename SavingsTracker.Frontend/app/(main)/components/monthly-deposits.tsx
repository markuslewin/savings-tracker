"use client";

import {
  bar,
  barAmount,
  bars,
  barsAmounts,
  barsContainer,
  barsGrid,
  barsGridItem,
  fallback,
  noDeposits,
} from "@/app/(main)/components/monthly-deposits.css";
import { getDepositsByMonth } from "@/app/(main)/utils/deposits";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { Deposit } from "@/app/utils/api";
import { formatMonth, formatCents } from "@/app/utils/locale";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export const MonthlyDeposits = dynamic(
  async () => {
    const { MonthlyDepositsImpl } =
      await import("@/app/(main)/components/monthly-deposits");
    return MonthlyDepositsImpl;
  },
  {
    loading: () => <div className={fallback} />,
    // Delay rendering until we know the time zone of the user
    ssr: false,
  },
);

type MonthlyDepositsProps = {
  now: Date;
  deposits: Deposit[];
};

export const MonthlyDepositsImpl = ({
  now,
  deposits,
}: MonthlyDepositsProps) => {
  const result = useMemo(() => {
    return getDepositsByMonth(now, deposits);
  }, [deposits, now]);

  return result.type === "empty" ? (
    <p
      className={clsx(
        noDeposits,
        sprinkles({
          textAlign: "center",
          color: "neutral-300",
        }),
      )}
    >
      No deposits yet
    </p>
  ) : (
    <div className={barsContainer}>
      <ol
        className={bars}
        style={{
          ...assignInlineVars({
            [barsAmounts]: result.values
              .map((deposit) => {
                return deposit.amount;
              })
              .join(", "),
          }),
        }}
        role="list"
      >
        {result.values.map((deposit, i) => {
          return (
            <li
              key={i}
              className={clsx(
                barsGridItem,
                bar,
                deposit.amount > 0
                  ? sprinkles({
                      border: "solid",
                      borderColor: "white-alpha-30",
                      borderRadius: "radius-08",
                      background: "orange-400",
                    })
                  : null,
              )}
              style={{
                ...assignInlineVars({
                  [barAmount]: deposit.amount.toString(),
                }),
              }}
            >
              <span className={srOnly}>
                {formatMonth(deposit.month)}: {formatCents(deposit.amount)}
              </span>
            </li>
          );
        })}
      </ol>
      <div
        className={clsx(
          barsGrid,
          sprinkles({
            marginBlockStart: "space-0125",
          }),
        )}
        // Values are accessible via list of bars
        aria-hidden="true"
      >
        {result.values.map((deposit, i) => {
          return (
            <div
              key={i}
              className={clsx(
                barsGridItem,
                sprinkles({
                  display: "grid",
                  gap: "space-0050",
                  textAlign: "center",
                }),
              )}
            >
              <div
                className={sprinkles({
                  color: "neutral-300",
                })}
              >
                {/* todo: Mobile text preset 7 */}
                {formatCents(deposit.amount)}
              </div>
              <div>{formatMonth(deposit.month)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
