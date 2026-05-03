import * as Button from "@/app/components/button";
import * as Input from "@/app/components/input";
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
        <Button.Root>
          <Button.Icon icon={FilterIcon} />
          Button
        </Button.Root>
        <Button.Root variant="secondary">Button</Button.Root>
        <Button.Root variant="tertiary">Button</Button.Root>
        <Input.Root>
          <Input.Field placeholder="Placeholder" />
        </Input.Root>
        <Input.Root>
          <Input.Field placeholder="Placeholder" />
          <Input.Icon icon={FilterIcon} />
        </Input.Root>
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
