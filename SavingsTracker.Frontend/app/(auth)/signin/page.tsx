import { logIn, setAuthCookie } from "@/app/utils/api";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";

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

          await setAuthCookie(result.data.setCookie);
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
