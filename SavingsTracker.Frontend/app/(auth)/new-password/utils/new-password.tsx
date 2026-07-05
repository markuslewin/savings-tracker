"use client";

import { Button } from "@/app/components/button";
import { button } from "@/app/components/button.css";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { FormState } from "@/app/utils/form";
import Link from "next/link";
import { useActionState } from "react";
import { Form } from "react-aria-components";

type NewPasswordProps = {
  action: (
    state: unknown,
    payload: FormData,
  ) => Promise<
    | { success: true }
    | ({ success: false } & FormState<"password" | "confirmPassword">)
  >;
};

export const NewPassword = ({ action }: NewPasswordProps) => {
  const [state, dispatch, isPending] = useActionState(action, {
    success: false,
    // todo: Optional
    values: {
      password: "",
      confirmPassword: "",
    },
  });

  return state.success ? (
    <>
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <h1 className={sprinkles({ text: "2" })}>Password reset</h1>
        <p
          className={sprinkles({
            color: "neutral-300",
          })}
        >
          Your password has been reset successfully.
        </p>
      </div>
      <Link className={button.primary} href={"/signin"}>
        Sign in to your account
      </Link>
    </>
  ) : (
    <>
      <div className={sprinkles({ stack: "space-0200" })}>
        <h1 className={sprinkles({ text: "2" })}>Create new password</h1>
        <p
          className={sprinkles({
            color: "neutral-300",
          })}
        >
          Your new password must be different from your previous password.
        </p>
      </div>
      <Form
        className={sprinkles({ stack: "space-0250" })}
        action={dispatch}
        validationErrors={state.errors}
      >
        <TextField
          label="New password"
          description="At least 8 characters"
          name="password"
          type="password"
          isRequired
        />
        <TextField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          isRequired
        />
        <Button
          className={sprinkles({
            marginBlockStart: "space-0150",
          })}
          type="submit"
          isPending={isPending}
        >
          Reset password
        </Button>
        <p
          className={sprinkles({
            textAlign: "center",
          })}
        >
          <Link
            className={sprinkles({
              color: "neutral-0",
            })}
            href={"/signin"}
          >
            Back to sign in
          </Link>
        </p>
      </Form>
    </>
  );
};
