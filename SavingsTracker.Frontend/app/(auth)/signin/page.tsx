import { logIn } from "@/app/utils/api";
import Form from "next/form";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";
import { parseSetCookie } from "cookie";

const Signin = () => {
  return (
    <>
      <h1>Sign in</h1>
      <Form
        style={{
          display: "grid",
          gap: "1rem",
        }}
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

          const cookieStore = await cookies();
          for (const setCookie of result.data.setCookies) {
            const parsedSetCookie = parseSetCookie(setCookie);
            if (parsedSetCookie.value === undefined) {
              break;
            }
            cookieStore.set({
              ...parsedSetCookie,
              value: parsedSetCookie.value,
            });
          }

          redirect("/");
        }}
      >
        <input name="email" />
        <input type="password" name="password" />
        <button>Sign in</button>
      </Form>
      <Link href={"/forgot-password"}>Forgot password?</Link>
      <Link href={"/signup"}>Create one</Link>
    </>
  );
};

export default Signin;
