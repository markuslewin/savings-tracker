import Link from "next/link";

const Signin = () => {
  return (
    <>
      <h1>Sign in</h1>
      <Link href={"/forgot-password"}>Forgot password?</Link>
      <Link href={"/signup"}>Create one</Link>
    </>
  );
};

export default Signin;
