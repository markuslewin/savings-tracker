"use client";

import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { FormAction } from "@/app/utils/form";
import Link from "next/link";
import { useActionState } from "react";
import { Form } from "react-aria-components";

type SignUpFormProps = {
  action: FormAction<"fullName" | "email" | "password">;
};

export const SignUpForm = ({ action }: SignUpFormProps) => {
  const [state, dispatch, isPending] = useActionState(action, {
    values: { fullName: "", email: "", password: "" },
  });

  return (
    <Form
      className={sprinkles({ stack: "space-0250" })}
      action={dispatch}
      validationErrors={state.errors}
    >
      <TextField
        label="Full name"
        name="fullName"
        defaultValue={state.values.fullName}
        isRequired
      />
      <TextField
        label="Email address"
        name="email"
        defaultValue={state.values.email}
        isRequired
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        defaultValue={state.values.password}
        isRequired
      />
      <Button
        className={sprinkles({
          marginBlockStart: "space-0150",
        })}
        type="submit"
      >
        Create account
      </Button>
      <p
        className={sprinkles({
          textAlign: "center",
          color: "neutral-300",
        })}
      >
        Already have an account?{" "}
        <Link
          className={sprinkles({
            color: "neutral-0",
          })}
          href={"/signin"}
        >
          Sign in
        </Link>
      </p>
    </Form>
  );
};
