import Link from "next/link";

const ForgotPassword = () => {
  return (
    <>
      <h1>Forgot password</h1>
      <Link href={"/signin"}>Sign in</Link>
    </>
  );
};

export default ForgotPassword;
