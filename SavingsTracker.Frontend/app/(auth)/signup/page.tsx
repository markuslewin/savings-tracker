import { SignUpForm } from "@/app/(auth)/signup/utils/sign-up-form";
import QuoteLayout from "@/app/(auth)/utils/quote-layout";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { register } from "@/app/utils/api";
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
      <SignUpForm
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
      />
    </QuoteLayout>
  );
};

export default Signup;
