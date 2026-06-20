import { MonthlyDeposits } from "@/app/(main)/components/monthly-deposits";
import { summaryCardDecoration } from "@/app/(main)/page.css";
import { GoalsSection } from "@/app/components/goals-section";
import { card } from "@/app/styles/card.css";
import { columns } from "@/app/styles/columns.css";
import { Sprinkles, sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { getAuthCookie, getGoals } from "@/app/utils/api";
import { getNow } from "@/app/utils/date";
import { filterSchema } from "@/app/utils/filter";
import { addSaved, isActive, isCompleted } from "@/app/utils/goal";
import { formatCents } from "@/app/utils/locale";
import { sum } from "@/app/utils/math";
import { sortSchema } from "@/app/utils/sort";
import clsx from "clsx";
import { ReactNode } from "react";
import * as z from "zod";

const Home = async ({ searchParams }: PageProps<"/">) => {
  const { filter, sort } = z
    .object({
      filter: filterSchema.default("All").catch("All"),
      sort: sortSchema.default("RecentlyAdded").catch("RecentlyAdded"),
    })
    .parse(await searchParams);

  const now = getNow();
  const goals = await getGoals({
    cookie: await getAuthCookie(),
    data: { filter, sort },
  });
  const goalsWithSaved = addSaved(goals);
  const deposits = goals.flatMap((g) => g.deposits);

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
          data={formatCents(sum(goalsWithSaved.map((g) => g.saved)))}
          testId="total-savings"
        />
        <SummaryCard
          color={"orange-400"}
          term="Active goals"
          data={goalsWithSaved.filter(isActive).length}
          testId="active-goals"
        />
        <SummaryCard
          color={"green-500"}
          term="Goals completed"
          data={goalsWithSaved.filter(isCompleted).length}
          testId="goals-completed"
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
            stack: "space-0250",
          }),
        )}
        data-testid="deposits"
      >
        <h2
          className={sprinkles({
            text: "4",
          })}
        >
          Monthly deposits
        </h2>
        <MonthlyDeposits now={now} deposits={deposits} />
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
  testId: string;
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
        data-testid={props.testId}
      >
        {props.data}
      </dd>
    </div>
  );
};
