import Link from "next/link";

const Signup = () => {
  return (
    <>
      <h1>Sign up</h1>
      <Link href={"/signin"}>Sign in</Link>
    </>
  );
};

export default Signup;
