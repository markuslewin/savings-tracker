import { getGoals } from "@/app/data/data";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Link from "next/link";
import styles from "./page.module.css";

const Home = async () => {
  const goals = await getGoals();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={sprinkles({
            background: "orange-400",
            padding: "spacing-100",
            borderRadius: "radius-4",
          })}
        />
        <Link href={"/signin"}>Sign in</Link>
        <ul>
          {goals.map((goal) => {
            return (
              <li key={goal.id}>
                <Link href={`/goal/${goal.id}`}>{goal.name}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Home;
