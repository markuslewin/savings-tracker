import QuoteLayout from "@/app/(auth)/utils/quote-layout";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { register } from "@/app/utils/api";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";

const Signup = () => {
  return (
    <QuoteLayout>
      <div className={sprinkles({ stack: "space-0200" })}>
        <h1 className={sprinkles({ text: "2" })}>Create your account</h1>
        <p
          className={sprinkles({
            color: "neutral-300",
          })}
        >
          Start tracking your savings goals
        </p>
      </div>
      <Form
        className={sprinkles({ stack: "space-0250" })}
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
        <Button
          className={sprinkles({
            marginBlockStart: "space-0150",
          })}
        >
          Create account
        </Button>
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
    </QuoteLayout>
  );
};

export default Signup;
