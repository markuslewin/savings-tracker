import {
  bar,
  barAmount,
  bars,
  barsAmounts,
  barsGrid,
  barsGridItem,
  card,
  goalCard,
  goalCards,
  goalsContainer,
  goalsHeading,
  monthlyCard,
  monthlyHeading,
  noGoalsBorder,
  noGoalsContainer,
  noGoalsHeading,
  orangeCardTheme,
  summaryCard,
  summaryCards,
  summaryDesc,
  summaryTerm,
} from "@/app/(main)/page.css";
import * as Button from "@/app/components/button";
import { DashedRect } from "@/app/components/dashed";
import { getGoals } from "@/app/data/data";
import FilterIcon from "@/app/icons/icon-filter.svg";
import PlusIcon from "@/app/icons/icon-plus.svg";
import SortIcon from "@/app/icons/icon-sort.svg";
import TargetIcon from "@/app/icons/icon-target.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import Link from "next/link";

const Home = async () => {
  const goals = await getGoals();

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
            card,
            orangeCardTheme,
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
            {goals
              .flatMap((goal) => {
                return goal.deposits;
              })
              .reduce((sum, deposit) => {
                return sum + deposit.amount;
              }, 0)}
          </dd>
        </div>
        <div className={clsx(card, summaryCard)}>
          <dt className={summaryTerm}>Active goals</dt>
          <dd
            className={clsx(
              summaryDesc,
              sprinkles({
                color: "orange-400",
              }),
            )}
          >
            {
              goals.filter((goal) => {
                return (
                  goal.deposits.reduce((sum, deposit) => {
                    return sum + deposit.amount;
                  }, 0) < goal.target
                );
              }).length
            }
          </dd>
        </div>
        <div className={clsx(card, summaryCard)}>
          <dt className={summaryTerm}>Goals completed</dt>
          <dd
            className={clsx(
              summaryDesc,
              sprinkles({
                color: "green-500",
              }),
            )}
          >
            {
              goals.filter((goal) => {
                return (
                  goal.deposits.reduce((sum, deposit) => {
                    return sum + deposit.amount;
                  }, 0) >= goal.target
                );
              }).length
            }
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
                        border: "default",
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
                  {deposit.month}: ${i}
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
                  {deposit.amount}
                </div>
                <div>{deposit.month}</div>
              </div>
            );
          })}
        </div>
      </div>
      <section className={goalsContainer}>
        <header
          className={sprinkles({
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "space-0200",
          })}
        >
          <h2 className={goalsHeading}>Your goals</h2>
          <div
            className={sprinkles({
              display: "flex",
              flexWrap: "wrap",
              gap: "space-0200",
            })}
          >
            <Button.Root variant="secondary">
              <Button.Icon icon={FilterIcon} />
              Filters
            </Button.Root>
            <Button.Root variant="secondary">
              <Button.Icon icon={SortIcon} />
              Sort by
            </Button.Root>
          </div>
        </header>
        <div className={sprinkles({ marginBlockStart: "space-0300" })}>
          {goals.length <= 0 ? (
            <div className={noGoalsContainer}>
              <DashedRect className={noGoalsBorder} />
              <div
                className={sprinkles({
                  marginInline: "auto",
                  maxWidth: "paragraph",
                  display: "grid",
                  textAlign: "center",
                })}
              >
                <TargetIcon
                  className={sprinkles({
                    marginInline: "auto",
                    width: "auto",
                    height: "size-0500",
                    color: "neutral-400",
                  })}
                />
                <h3 className={noGoalsHeading}>No goals yet</h3>
                <p
                  className={sprinkles({
                    marginBlockStart: "space-0250",
                    color: "neutral-300",
                  })}
                >
                  Start saving for something that matters. Create your first
                  goal and track your progress.
                </p>
                <Button.Root
                  className={sprinkles({
                    marginInline: "auto",
                    marginBlockStart: "space-0400",
                  })}
                >
                  <Button.Icon icon={PlusIcon} />
                  Create your first goal
                </Button.Root>
              </div>
            </div>
          ) : (
            <ul className={goalCards} role="list">
              {goals.map((goal, i) => {
                return (
                  <li
                    key={goal.id}
                    className={clsx(goalCard, i === 0 ? orangeCardTheme : null)}
                  >
                    <h3>
                      <Link href={`/goal/${goal.id}`}>{goal.name}</Link>
                    </h3>
                    <p>76%</p>
                    <div />
                    <p>
                      <span>
                        {0} of {goal.target}
                      </span>
                      <span
                        className={sprinkles({
                          width: "size-0050",
                          height: "size-0050",
                          borderRadius: "radius-full",
                          background: "neutral-900",
                        })}
                      />
                      <span>
                        {goal.deadline === null
                          ? "No deadline"
                          : `Due ${goal.deadline}`}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
