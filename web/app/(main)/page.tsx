import {
  bars,
  card,
  goalCard,
  goalCards,
  goalsContainer,
  goalsHeading,
  monthlyContainer,
  monthlyHeading,
  noGoalsBorder,
  noGoalsContainer,
  noGoalsHeading,
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
import Link from "next/link";

const Home = async () => {
  const goals = await getGoals();

  return (
    <div
      className={sprinkles({
        paddingBlock: "space-0600",
      })}
    >
      <h1 className={srOnly}>Dashboard</h1>
      <h2 className={srOnly}>Summary</h2>
      <dl className={summaryCards}>
        <div className={card}>
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
        <div className={card}>
          <dt className={summaryTerm}>Active goals</dt>
          <dd className={summaryDesc}>
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
        <div className={card}>
          <dt className={summaryTerm}>Goals completed</dt>
          <dd className={summaryDesc}>
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
      <div className={monthlyContainer}>
        <h2 className={monthlyHeading}>Monthly deposits</h2>
        <div className={bars}></div>
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
                  <li key={goal.id} className={goalCard}>
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
