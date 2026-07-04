"use client";

import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { FormAction } from "@/app/utils/form";
import Link from "next/link";
import { useActionState } from "react";
import { Form } from "react-aria-components";

type SignInFormProps = {
  action: FormAction<"email" | "password">;
};

export const SignInForm = ({ action }: SignInFormProps) => {
  const [state, dispatch, isPending] = useActionState(action, {
    values: { email: "", password: "" },
  });

  return (
    <Form
      className={sprinkles({
        stack: "space-0250",
      })}
      action={dispatch}
      validationErrors={state.errors}
    >
      <TextField
        label="Email address"
        name="email"
        isRequired
        defaultValue={state.values.email}
      />
      <div className={sprinkles({ stack: "space-0150" })}>
        <TextField
          label="Password"
          type="password"
          name="password"
          isRequired
          defaultValue={state.values.password}
        />
        <Link
          className={sprinkles({
            justifySelf: "end",
            textAlign: "end",
            textDecoration: "none",
            color: {
              default: "neutral-300",
              hover: "neutral-0",
            },
            transition: "default",
          })}
          href={"/forgot-password"}
        >
          Forgot password?
        </Link>
      </div>
      <Button
        className={sprinkles({ marginBlockStart: "space-0150" })}
        type="submit"
      >
        Sign in
      </Button>
      <p
        className={sprinkles({
          textAlign: "center",
          color: "neutral-300",
        })}
      >
        Don&apos;t have an account?{" "}
        <Link className={sprinkles({ color: "neutral-0" })} href={"/signup"}>
          Create one
        </Link>
      </p>
    </Form>
  );
};
