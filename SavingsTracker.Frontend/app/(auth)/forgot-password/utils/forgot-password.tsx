"use client";

import { paragraph } from "@/app/(auth)/forgot-password/utils/forgot-password.css";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";

type ForgotPasswordProps = {
  resetAction: () => Promise<void>;
};

export const ForgotPassword = ({ resetAction }: ForgotPasswordProps) => {
  const [{ sentTo }, action, isPending] = useActionState<{
    sentTo: string | null;
  }>(
    async () => {
      // todo: Implement
      await resetAction();
      return { sentTo: "user@example.com" };
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
        action={action}
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
              color: "neutral-0",
            })}
          >
            {sentTo}
          </b>
        </p>
      </div>
      <p>The link expires in 30 minutes.</p>
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
            type="submit"
            formAction={() => {
              // todo
              console.log("Resend email");
            }}
          >
            Resend email
          </Button>
        </p>
        <Link href={"/signin"}>Back to sign in</Link>
      </div>
    </>
  );
};
