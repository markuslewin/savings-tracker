import { ForgotPassword } from "@/app/(auth)/forgot-password/utils/forgot-password";
import QuoteLayout from "@/app/(auth)/utils/quote-layout";

const Page = () => {
  return (
    <QuoteLayout>
      <ForgotPassword
        resetAction={async () => {
          "use server";
          console.log("Send reset link");
        }}
      />
    </QuoteLayout>
  );
};

export default Page;
