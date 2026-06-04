import QuoteLayout from "@/app/(auth)/utils/quote-layout";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { logIn, setAuthCookie } from "@/app/utils/api";
import { Hr } from "@/app/utils/hr";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";

const Signin = () => {
  return (
    <QuoteLayout>
      <div
        className={sprinkles({
          stack: "space-0100",
        })}
      >
        <h1>Welcome back</h1>
        <p className={sprinkles({ color: "neutral-300" })}>
          Sign in to your account
        </p>
      </div>
      <Hr color="neutral-700" />
      <Form
        className={sprinkles({
          stack: "space-0250",
        })}
        action={async (formData) => {
          "use server";
          const values = Object.fromEntries(formData);
          const parsed = z
            .object({
              email: z.string(),
              password: z.string(),
            })
            .parse(values);
          const result = await logIn(parsed);
          if (!result.success) {
            console.log("todo: Feedback");
            return;
          }

          await setAuthCookie(result.data.setCookie);
          redirect("/");
        }}
      >
        <TextField label="Email address" name="email" isRequired />
        <div className={sprinkles({ stack: "space-0150" })}>
          <TextField
            label="Password"
            type="password"
            name="password"
            isRequired
          />
          <Link
            className={sprinkles({
              justifySelf: "end",
              textAlign: "end",
              textDecoration: "none",
              color: "neutral-300",
            })}
            href={"/forgot-password"}
          >
            Forgot password?
          </Link>
        </div>
        <Button className={sprinkles({ marginBlockStart: "space-0150" })}>
          Sign in
        </Button>
        <p
          className={sprinkles({
            textAlign: "center",
            color: "neutral-300",
          })}
        >
          Don&apos;t have an account?{" "}
          <Link className={sprinkles({ color: "neutral-0" })} href={"/signup"}>
            Create one
          </Link>
        </p>
      </Form>
    </QuoteLayout>
  );
};

export default Signin;
