"use client";

import { paragraph } from "@/app/(auth)/forgot-password/utils/forgot-password.css";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import ChevronLeftIcon from "@/app/icons/icon-chevron-left.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Form from "next/form";
import Link from "next/link";
import { startTransition, useActionState } from "react";

type ForgotPasswordProps = {
  resetAction: () => Promise<void>;
};

export const ForgotPassword = ({ resetAction }: ForgotPasswordProps) => {
  const [{ sentTo }, dispatch, isPending] = useActionState<
    {
      sentTo: string | null;
    },
    FormData | { type: "reset" }
  >(
    async (previousState, payload) => {
      if (payload instanceof FormData) {
        // todo: Implement
        await resetAction();
        return { sentTo: "user@example.com" };
      }
      switch (payload.type) {
        case "reset":
          return { sentTo: null };
      }
    },
    {
      sentTo: null,
    },
  );

  return sentTo === null ? (
    <>
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <h1>Forgot your password?</h1>
        <p className={paragraph}>
          Enter your email address and we&apos;ll send you a link to reset it.
        </p>
      </div>
      <Form
        className={sprinkles({
          stack: "space-0250",
        })}
        action={dispatch}
      >
        <TextField label="Email address" name="email" isRequired />
        <Button
          className={sprinkles({
            marginBlockStart: "space-0150",
          })}
          type="submit"
          // todo: Pending state
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
        <h1>Check your inbox</h1>
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
          >
            {sentTo}
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
        <Link
          className={sprinkles({
            justifySelf: "start",
            display: "inline-flex",
            gap: "space-0075",
            alignItems: "center",
            textDecoration: "none",
            color: { default: "neutral-300", hover: "neutral-0" },
            transition: "default",
          })}
          href={"/signin"}
        >
          <ChevronLeftIcon
            className={sprinkles({
              width: "auto",
              height: "size-0250",
            })}
          />{" "}
          Back to sign in
        </Link>
      </div>
    </>
  );
};
