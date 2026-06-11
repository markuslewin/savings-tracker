"use client";

import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Link from "next/link";
import { useActionState } from "react";

type SignUpFormProps = {
  action: (formData: FormData) => Promise<void>;
};

export const SignUpForm = ({ action }: SignUpFormProps) => {
  const [state, dispatch, isPending] = useActionState<undefined, FormData>(
    (previousState, payload) => {
      action(payload);
    },
    undefined,
  );

  return (
    <form className={sprinkles({ stack: "space-0250" })} action={dispatch}>
      <TextField label="Full name" name="name" isRequired />
      <TextField label="Email address" name="email" isRequired />
      <TextField label="Password" type="password" name="password" isRequired />
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
    </form>
  );
};
