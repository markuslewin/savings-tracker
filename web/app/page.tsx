import { sprinkles } from "@/app/styles/sprinkles.css";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
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
      </main>
    </div>
  );
}
