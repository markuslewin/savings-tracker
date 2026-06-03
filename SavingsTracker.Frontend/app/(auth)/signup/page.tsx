import { form as layoutForm } from "@/app/(auth)/layout.css";
import * as styles from "@/app/(auth)/signup/page.css";
import { getQuote } from "@/app/(auth)/utils/quote";
import { register } from "@/app/utils/api";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";

const Signup = () => {
  const quote = getQuote();

  return (
    <>
      <article className={layoutForm}>
        <header>Savings Tracker</header>
        <h1>Create your account</h1>
        <Form
          style={{
            display: "grid",
            gap: "1rem",
          }}
          action={async (formData) => {
            "use server";
            const values = Object.fromEntries(formData);
            const parsed = z
              .object({
                fullName: z.string(),
                email: z.string(),
                password: z.string(),
              })
              .parse(values);
            await register(parsed);
            redirect("/signin");
          }}
        >
          <input name="fullName" />
          <input name="email" />
          <input type="password" name="password" />
          <button>Create Account</button>
          <p>
            Already have an account? <Link href={"/signin"}>Sign in</Link>
          </p>
        </Form>
      </article>
      <aside className={styles.quote}>
        <figure className={styles.quoteFigure}>
          <blockquote className={styles.quoteText}>
            &quot;{quote.text}&quot;
          </blockquote>
          <figcaption className={styles.quoteSource}>
            — {quote.source}
          </figcaption>
        </figure>
      </aside>
    </>
  );
};

export default Signup;
