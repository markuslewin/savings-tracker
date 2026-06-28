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
        action={async (_, formData) => {
          "use server";
          const values = Object.fromEntries(formData) as Record<
            "fullName" | "email" | "password",
            string
          >;
          const parsed = z
            .object({
              fullName: z.string(),
              email: z.string(),
              password: z.string(),
            })
            .safeParse(values);
          if (!parsed.success)
            return {
              values: { ...values, password: "" },
              errors: z.flattenError(parsed.error).fieldErrors,
            };

          const response = await register(parsed.data);
          if (response?.status === 400)
            return {
              values: { ...values, password: "" },
              errors: response.json.errors,
            };
          redirect("/signin");
        }}
      />
    </QuoteLayout>
  );
};

export default Signup;
