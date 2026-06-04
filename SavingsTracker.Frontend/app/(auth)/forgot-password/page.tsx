import { paragraph } from "@/app/(auth)/forgot-password/page.css";
import QuoteLayout from "@/app/(auth)/utils/quote-layout";
import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Form from "next/form";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <QuoteLayout>
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
        action={async () => {
          "use server";
          console.log("Send reset link");
        }}
      >
        <TextField label="Email address" name="email" isRequired />
        <Button
          className={sprinkles({
            marginBlockStart: "space-0150",
          })}
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
    </QuoteLayout>
  );
};

export default ForgotPassword;
