import { NewPassword } from "@/app/(auth)/new-password/utils/new-password";
import QuoteLayout from "@/app/(auth)/utils/quote-layout";
import { changePassword, ensureAuthCookie } from "@/app/utils/api";
import * as z from "zod";

const NewPasswordPage = async () => {
  await ensureAuthCookie();

  return (
    <QuoteLayout>
      <NewPassword
        action={async (_, formData) => {
          "use server";
          const values = Object.fromEntries(formData);
          const parsed = z
            .object({
              password: z.string(),
              confirmPassword: z.string(),
            })
            .refine((data) => data.password === data.confirmPassword, {
              error: "Passwords don't match",
              path: ["confirmPassword"],
            })
            .parse(values);
          await changePassword({
            cookie: await ensureAuthCookie(),
            data: { password: parsed.password },
          });
          return { success: true };
        }}
      />
    </QuoteLayout>
  );
};

export default NewPasswordPage;
