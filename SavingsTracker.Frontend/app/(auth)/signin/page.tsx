import { SignInForm } from "@/app/(auth)/signin/utils/sign-in-form";
import QuoteLayout from "@/app/(auth)/utils/quote-layout";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { logIn, setAuthCookie } from "@/app/utils/api";
import { Hr } from "@/app/utils/hr";
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
          if (response.status === 400)
            return {
              values: { ...values, password: "" },
              errors: response.json.errors,
            };
          // todo: Sign in failed
          if (response.status === 401)
            return { values: { ...values, password: "" } };

          await setAuthCookie(response.data.setCookie);
          redirect("/");
        }}
      />
    </QuoteLayout>
  );
};

export default Signin;
