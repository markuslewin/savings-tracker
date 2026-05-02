import { getGoal } from "@/app/data/data";
import Link from "next/link";
import { notFound } from "next/navigation";

const Goal = async ({ params }: PageProps<"/goal/[id]">) => {
  const { id } = await params;
  const goal = await getGoal(id);
  if (goal === null) {
    return notFound();
  }

  return (
    <>
      <h1>Goal &quot;{id}&quot;</h1>
      <p>{goal.name}</p>
      <ul>
        {goal.deposits.map((deposit) => {
          return <li key={deposit.id}>{deposit.amount}</li>;
        })}
      </ul>
      <Link href={"/"}>Back</Link>
    </>
  );
};

export default Goal;
