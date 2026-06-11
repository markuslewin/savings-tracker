import {
  bar,
  barAmount,
  bars,
  barsAmounts,
  barsGrid,
  barsGridItem,
  summaryCardDecoration,
} from "@/app/(main)/page.css";
import { GoalsSection } from "@/app/components/goals-section";
import { card } from "@/app/styles/card.css";
import { columns } from "@/app/styles/columns.css";
import { Sprinkles, sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { getAuthCookie, getGoals } from "@/app/utils/api";
import { filterSchema } from "@/app/utils/filter";
import { addSaved, isActive, isCompleted } from "@/app/utils/goal";
import { formatUsd } from "@/app/utils/locale";
import { sum } from "@/app/utils/math";
import { sortSchema } from "@/app/utils/sort";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import { ReactNode } from "react";
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
    <div>
      <h1 className={srOnly}>Dashboard</h1>
      <h2 className={srOnly}>Summary</h2>
      <dl
        className={clsx([
          columns,
          sprinkles({
            columnsNumber: {
              tablet: "2",
              desktop: "4",
            },
            columnsSpace: { mobile: "space-0200", tablet: "space-0300" },
          }),
        ])}
      >
        <SummaryCard
          highlight
          term="Total savings"
          data={formatUsd(sum(goalsWithSaved.map((g) => g.saved)))}
        />
        <SummaryCard
          color={"orange-400"}
          term="Active goals"
          data={goalsWithSaved.filter(isActive).length}
        />
        <SummaryCard
          color={"green-500"}
          term="Goals completed"
          data={goalsWithSaved.filter(isCompleted).length}
        />
      </dl>
      <div
        className={clsx(
          card.grey,
          sprinkles({
            marginBlockStart: {
              mobile: "space-0200",
              tablet: "space-0300",
            },
            boxSpace: { mobile: "space-0200", tablet: "space-0250" },
          }),
        )}
      >
        <h2
          className={sprinkles({
            text: "4",
          })}
        >
          Monthly deposits
        </h2>
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

type SummaryCardProps = {
  term: string;
  data: ReactNode;
} & ({ highlight: true } | { highlight?: false; color: Sprinkles["color"] });

const SummaryCard = (props: SummaryCardProps) => {
  return (
    <div
      className={clsx(
        sprinkles({
          boxSpaceInline: {
            mobile: "space-0200",
            tablet: "space-0250",
          },
          boxSpaceBlock: {
            mobile: "space-0200",
            desktop: "space-0250",
          },
        }),
        props.highlight
          ? [card.orange, sprinkles({ gridColumn: { tablet: "span 2" } })]
          : [card.grey, summaryCardDecoration],
      )}
    >
      <dt
        className={sprinkles({
          text: "5-semiBold",
        })}
      >
        {props.term}
      </dt>
      <dd
        className={sprinkles({
          marginBlockStart: "space-0400",
          text: "1",
          color: props.highlight ? undefined : props.color,
        })}
      >
        {props.data}
      </dd>
    </div>
  );
};
