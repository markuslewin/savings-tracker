"use client";

import { paragraph } from "@/app/(auth)/forgot-password/utils/forgot-password.css";
import { Back } from "@/app/components/back";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { FormState } from "@/app/utils/form";
import Link from "next/link";
import { startTransition, useActionState } from "react";
import { Form } from "react-aria-components/Form";

type Payload = FormData | { type: "reset" };
type State =
  | ({ view: "initial" } & FormState<"email">)
  | { view: "success"; email: string };

const initialState: State = {
  view: "initial",
  values: {
    email: "",
  },
};

type ForgotPasswordProps = {
  resetAction: (previousState: State, formData: FormData) => Promise<State>;
};

export const ForgotPassword = ({ resetAction }: ForgotPasswordProps) => {
  const [state, dispatch, isPending] = useActionState<State, Payload>(
    async (previousState, payload) => {
      if (payload instanceof FormData) {
        return await resetAction(previousState, payload);
      }
      switch (payload.type) {
        case "reset":
          return initialState;
      }
    },
    initialState,
  );

  return state.view === "initial" ? (
    <>
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <h1
          className={sprinkles({
            text: "2",
          })}
        >
          Forgot your password?
        </h1>
        <p className={paragraph}>
          Enter your email address and we&apos;ll send you a link to reset it.
        </p>
      </div>
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
          defaultValue={state.values.email}
          isRequired
        />
        <Button
          className={sprinkles({
            marginBlockStart: "space-0150",
          })}
          type="submit"
          isPending={isPending}
        >
          Send reset link
        </Button>
        <Link
          className={sprinkles({
            justifySelf: "center",
            textAlign: "center",
            color: "neutral-0",
          })}
          href={"/signin"}
        >
          Back to sign in
        </Link>
      </Form>
    </>
  ) : (
    <>
      <div
        className={sprinkles({
          stack: "space-0100",
        })}
      >
        <h1 className={sprinkles({ text: "2" })}>Check your inbox</h1>
        <p
          className={sprinkles({
            color: "neutral-300",
          })}
        >
          We&apos;ve sent a reset link to{" "}
          <b
            className={sprinkles({
              fontWeight: "inherit",
              color: "neutral-0",
            })}
            data-testid="email"
          >
            {state.email}
          </b>
        </p>
      </div>
      <p>The link expires in 30 minutes.</p>
      {/* todo: Open email app..? */}
      <Button variant="secondary">Open email app</Button>
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <p
          className={sprinkles({
            color: "neutral-300",
          })}
        >
          Didn&apos;t receive it?{" "}
          <Button
            className={sprinkles({
              line: "underline",
              color: "neutral-0",
            })}
            variant="text"
            onPress={() => {
              startTransition(() => {
                dispatch({ type: "reset" });
              });
            }}
          >
            Resend email
          </Button>
        </p>
        <Back to={"/signin"}>Back to sign in</Back>
      </div>
    </>
  );
};
