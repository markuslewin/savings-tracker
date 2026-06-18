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
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { Deposit } from "@/app/utils/api";
import { formatUsd } from "@/app/utils/locale";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import dynamic from "next/dynamic";

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
  deposits: Deposit[];
};

export const MonthlyDepositsImpl = ({ deposits }: MonthlyDepositsProps) => {
  // todo: Fix
  const monthlyDeposits = [
    { month: "Apr", amount: 0 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: 500 },
    { month: "Jul", amount: 400 },
    { month: "Aug", amount: 400 },
    { month: "Sep", amount: 1150 },
    { month: "Oct", amount: 1149 },
    { month: "Nov", amount: 1550 },
    { month: "Dec", amount: 2350 },
    { month: "Jan", amount: 1025 },
    { month: "Feb", amount: 1550 },
    { month: "Mar", amount: 1550 },
  ];

  return deposits.length <= 0 ? (
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
            [barsAmounts]: monthlyDeposits
              .map((deposit) => {
                return deposit.amount;
              })
              .join(", "),
          }),
        }}
        role="list"
      >
        {monthlyDeposits.map((deposit, i) => {
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
                {deposit.month}: {formatUsd(deposit.amount)}
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
        {monthlyDeposits.map((deposit, i) => {
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
                {formatUsd(deposit.amount)}
              </div>
              <div>{deposit.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
