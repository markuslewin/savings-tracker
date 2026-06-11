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
        <h1>Welcome back</h1>
        <p className={sprinkles({ color: "neutral-300" })}>
          Sign in to your account
        </p>
      </div>
      <Hr color="neutral-700" />
      <SignInForm
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
      />
    </QuoteLayout>
  );
};

export default Signin;
