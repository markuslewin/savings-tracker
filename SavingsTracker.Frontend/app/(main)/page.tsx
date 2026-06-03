import {
  bar,
  barAmount,
  bars,
  barsAmounts,
  barsGrid,
  barsGridItem,
  monthlyCard,
  monthlyHeading,
  summaryCard,
  summaryCards,
  summaryDesc,
  summaryTerm,
} from "@/app/(main)/page.css";
import { GoalsSection } from "@/app/components/goals-section";
import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { getAuthCookie } from "@/app/utils/api";
import { filterSchema } from "@/app/utils/filter";
import { addSaved, isActive, isCompleted } from "@/app/utils/goal";
import { getGoals } from "@/app/utils/goal-service/core";
import { formatUsd } from "@/app/utils/locale";
import { sum } from "@/app/utils/math";
import { sortSchema } from "@/app/utils/sort";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import * as z from "zod";

const Home = async ({ searchParams }: PageProps<"/">) => {
  const { filter, sort } = z
    .object({
      filter: filterSchema.default("all").catch("all"),
      sort: sortSchema.default("recently-added").catch("recently-added"),
    })
    .parse(await searchParams);

  const goals = await getGoals({
    cookie: await getAuthCookie(),
  });
  const goalsWithSaved = addSaved(goals);

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

  return (
    <div
      className={sprinkles({
        paddingBlock: "space-0600",
      })}
    >
      <h1 className={srOnly}>Dashboard</h1>
      <h2 className={srOnly}>Summary</h2>
      <dl className={summaryCards}>
        <div
          className={clsx(
            card.styles.orange,
            summaryCard,
            sprinkles({
              gridColumn: {
                tablet: "span 2",
              },
            }),
          )}
        >
          <dt className={summaryTerm}>Total savings</dt>
          <dd className={summaryDesc}>
            {formatUsd(sum(goalsWithSaved.map((g) => g.saved)))}
          </dd>
        </div>
        <div className={clsx(card.styles.grey, summaryCard)}>
          <dt className={summaryTerm}>Active goals</dt>
          <dd
            className={clsx(
              summaryDesc,
              sprinkles({
                color: "orange-400",
              }),
            )}
          >
            {goalsWithSaved.filter(isActive).length}
          </dd>
        </div>
        <div className={clsx(card.styles.grey, summaryCard)}>
          <dt className={summaryTerm}>Goals completed</dt>
          <dd
            className={clsx(
              summaryDesc,
              sprinkles({
                color: "green-500",
              }),
            )}
          >
            {goalsWithSaved.filter(isCompleted).length}
          </dd>
        </div>
      </dl>
      <div className={monthlyCard}>
        <h2 className={monthlyHeading}>Monthly deposits</h2>
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
      <GoalsSection
        filter={filter}
        sort={sort}
        view={
          goalsWithSaved.length <= 0
            ? { type: "no-goals" }
            : { type: "goals", goals: goalsWithSaved }
        }
      />
    </div>
  );
};

export default Home;
