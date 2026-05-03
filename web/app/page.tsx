import { Button } from "@/app/components/button";
import { icon } from "@/app/components/button.css";
import { getGoals } from "@/app/data/data";
import FilterIcon from "@/app/icons/icon-filter.svg";
import Link from "next/link";
import styles from "./page.module.css";

const Home = async () => {
  const goals = await getGoals();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={"/signin"}>Sign in</Link>
        <Button>
          <FilterIcon className={icon["size-0250"]} />
          Button
        </Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
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
