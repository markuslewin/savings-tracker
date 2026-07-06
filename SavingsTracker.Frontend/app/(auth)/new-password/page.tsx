import { NewPassword } from "@/app/(auth)/new-password/utils/new-password";
import { QuoteLayout } from "@/app/(auth)/utils/quote-layout";
import { changePassword, ensureAuthCookie } from "@/app/utils/api";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import * as z from "zod";

export const metadata: Metadata = {
  title: "New Password",
};

const NewPasswordPage = async () => {
  return (
    <Suspense>
      <NewPasswordPageCore />
    </Suspense>
  );
};

export default NewPasswordPage;

const NewPasswordPageCore = async () => {
  await ensureAuthCookie();

  return (
    <QuoteLayout>
      <NewPassword
        action={async (_, formData) => {
          "use server";
          const values = Object.fromEntries(formData) as Record<string, string>;
          const parsed = z
            .object({
              password: z.string(),
              confirmPassword: z.string(),
            })
            .refine((data) => data.password === data.confirmPassword, {
              error: "Passwords don't match",
              path: ["confirmPassword"],
            })
            .safeParse(values);
          if (!parsed.success)
            return {
              success: false,
              values,
              errors: z.flattenError(parsed.error).fieldErrors,
            };

          const response = await changePassword({
            cookie: await ensureAuthCookie(),
            data: { password: parsed.data.password },
          });
          switch (response.status) {
            case 204:
              return { success: true };
            case 400:
              return { success: false, values, errors: response.json.errors };
            case 401:
              redirect("/signin");
          }
        }}
      />
    </QuoteLayout>
  );
};
