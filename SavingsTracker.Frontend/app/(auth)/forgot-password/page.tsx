import { ForgotPassword } from "@/app/(auth)/forgot-password/utils/forgot-password";
import { QuoteLayout } from "@/app/(auth)/utils/quote-layout";
import { forgotPassword } from "@/app/utils/api";
import { Metadata } from "next";
import * as z from "zod";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const Page = () => {
  return (
    <QuoteLayout>
      <ForgotPassword
        resetAction={async (_, formData) => {
          "use server";

          const values = Object.fromEntries(formData) as Record<string, string>;
          const parsed = z.object({ email: z.string() }).safeParse(values);
          if (!parsed.success)
            return {
              view: "initial",
              values,
              errors: z.flattenError(parsed.error).fieldErrors,
            };

          const response = await forgotPassword({
            data: { email: parsed.data.email },
          });
          switch (response.status) {
            case 200:
              return { view: "success", email: parsed.data.email };
            case 400:
              return { view: "initial", values, errors: response.json.errors };
          }
        }}
      />
    </QuoteLayout>
  );
};

export default Page;
