import { register } from "@/app/utils/api";
import Form from "next/form";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as z from "zod";

const Signup = () => {
  return (
    <>
      <h1>Sign up</h1>
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
              fullName: z.string(),
              email: z.string(),
              password: z.string(),
            })
            .parse(values);
          await register(parsed);
          redirect("/signin");
        }}
      >
        <input name="fullName" />
        <input name="email" />
        <input type="password" name="password" />
        <button>Create Account</button>
      </Form>
      <Link href={"/signin"}>Sign in</Link>
    </>
  );
};

export default Signup;
