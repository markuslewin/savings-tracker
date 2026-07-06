import { getRandomQuote } from "@/app/(auth)/utils/quote";
import * as styles from "@/app/(auth)/utils/quote-layout.css";
import { full, LogoLink } from "@/app/components/logo-link";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { connection } from "next/server";
import { ReactNode, Suspense } from "react";

type QuoteLayoutProps = {
  children: ReactNode;
};

export const QuoteLayout = ({ children }: QuoteLayoutProps) => {
  return (
    <>
      <article className={styles.article}>
        <header
          className={sprinkles({
            display: "grid",
            justifyContent: "start",
          })}
        >
          <LogoLink logo={full} />
        </header>
        {children}
      </article>
      <aside className={styles.quote}>
        <Suspense>
          <QuoteFigure />
        </Suspense>
      </aside>
    </>
  );
};

const QuoteFigure = async () => {
  await connection();
  const quote = getRandomQuote();

  return (
    <figure className={styles.quoteFigure}>
      <blockquote className={styles.quoteText}>
        &quot;{quote.text}&quot;
      </blockquote>
      <figcaption className={styles.quoteSource}>— {quote.source}</figcaption>
    </figure>
  );
};
