import { SignInForm } from "@/app/(auth)/signin/utils/sign-in-form";
import { QuoteLayout } from "@/app/(auth)/utils/quote-layout";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { logIn, setAuthCookie } from "@/app/utils/api";
import { Hr } from "@/app/utils/hr";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as z from "zod";

export const metadata: Metadata = {
  title: "Sign In",
};

const Signin = () => {
  return (
    <QuoteLayout>
      <div
        className={sprinkles({
          stack: "space-0100",
        })}
      >
        <h1
          className={sprinkles({
            text: "2",
          })}
        >
          Welcome back
        </h1>
        <p className={sprinkles({ color: "neutral-300" })}>
          Sign in to your account
        </p>
      </div>
      <Hr color="neutral-700" />
      <SignInForm
        action={async (_, formData) => {
          "use server";
          const values = Object.fromEntries(formData) as Record<
            "email" | "password",
            string
          >;
          const parsed = z
            .object({
              email: z.string(),
              password: z.string(),
            })
            .safeParse(values);
          if (!parsed.success)
            return {
              values: { ...values, password: "" },
              errors: z.flattenError(parsed.error).fieldErrors,
            };

          const response = await logIn(parsed.data);
          switch (response.status) {
            case 200:
              await setAuthCookie(response.data.setCookie);
              redirect("/");
            case 400:
              return {
                values: { ...values, password: "" },
                errors: response.json.errors,
              };
            case 401:
              // todo: Sign in failed
              return { values: { ...values, password: "" } };
          }
        }}
      />
    </QuoteLayout>
  );
};

export default Signin;
