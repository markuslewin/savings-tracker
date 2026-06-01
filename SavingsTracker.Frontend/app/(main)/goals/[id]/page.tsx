import { Button } from "@/app/components/button";
import * as buttonStyles from "@/app/components/button.css";
import { getGoal } from "@/app/utils/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as z from "zod";

const Goal = async ({ params }: PageProps<"/goals/[id]">) => {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(await params);
  const result = await getGoal(id);
  if (!result.success) throw result.error;

  const { data: goal } = result;
  if (goal === null) return notFound();

  return (
    <article>
      <header>
        <Link href={"/#goals"}>Back</Link>
        <Button className={buttonStyles.variants.tertiary}>Edit goal</Button>
        <Button className={buttonStyles.variants.tertiary}>Delete goal</Button>
      </header>
      <h1>{goal.name}</h1>
      <p>{goal.deadline?.toString()}</p>
      <p>{goal.createdAt.toString()}</p>
      <p>{goal.target}</p>
      <ul>
        {goal.deposits.map((deposit) => {
          return (
            <li key={deposit.id}>
              <p>{deposit.note}</p>
              <p>{deposit.amount}</p>
              <p>{deposit.createdAt.toString()}</p>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Goal;
