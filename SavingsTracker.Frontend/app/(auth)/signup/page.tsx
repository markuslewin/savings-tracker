import * as styles from "@/app/(auth)/signup/page.css";
import { getQuote } from "@/app/(auth)/utils/quote";
import { Button } from "@/app/components/button";
import { full, LogoLink } from "@/app/components/logo-link";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { register } from "@/app/utils/api";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";

const Signup = () => {
  const quote = getQuote();

  return (
    <>
      <article className={styles.article}>
        <header>
          <LogoLink logo={full} />
        </header>
        <div className={styles.intro}>
          <h1 className={styles.heading}>Create your account</h1>
          <p className={styles.paragraph}>Start tracking your savings goals</p>
        </div>
        <Form
          className={styles.form}
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
          <TextField label="Full name" name="name" isRequired />
          <TextField label="Email address" name="email" isRequired />
          <TextField
            label="Password"
            type="password"
            name="password"
            isRequired
          />
          <Button className={styles.submit}>Create account</Button>
          <p
            className={sprinkles({
              textAlign: "center",
              color: "neutral-300",
            })}
          >
            Already have an account?{" "}
            <Link
              className={sprinkles({
                color: "neutral-0",
              })}
              href={"/signin"}
            >
              Sign in
            </Link>
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
