import { QuoteLayout } from "@/app/(auth)/utils/quote-layout";
import { button } from "@/app/components/button.css";
import { Link } from "@/app/components/navigation";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { confirmEmail } from "@/app/utils/api";
import { Metadata } from "next";
import * as z from "zod";

export const metadata: Metadata = {
  title: "Confirm email",
};

const ConfirmEmailPage = async ({
  searchParams,
}: PageProps<"/confirm-email">) => {
  const result = z
    .object({
      userId: z.string(),
      code: z.string(),
    })
    .safeParse(await searchParams);
  if (!result.success) return <ErrorView title="Invalid parameters" />;

  const response = await confirmEmail(result.data);
  switch (response.status) {
    case 200:
      return (
        <QuoteLayout>
          <div
            className={sprinkles({
              stack: "space-0200",
            })}
          >
            <h1 className={sprinkles({ text: "2" })}>Email confirmed</h1>
            <p
              className={sprinkles({
                color: "neutral-300",
              })}
            >
              Your email has been confirmed successfully.
            </p>
          </div>
          <Link className={button.primary} href={"/signin"}>
            Sign in to your account
          </Link>
        </QuoteLayout>
      );
    case 401:
      return <ErrorView title="Something went wrong" />;
  }
};

export default ConfirmEmailPage;

type ErrorViewProps = {
  title: string;
};

const ErrorView = ({ title }: ErrorViewProps) => {
  return (
    <QuoteLayout>
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <h1 className={sprinkles({ text: "2" })}>{title}</h1>
        <p
          className={sprinkles({
            color: "neutral-300",
          })}
        >
          We couldn&apos;t confirm your email.
        </p>
      </div>
      <Link className={button.primary} href={"/signin"}>
        Sign in to your account
      </Link>
    </QuoteLayout>
  );
};
