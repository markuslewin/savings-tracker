import Link from "next/link";

const Goal = async ({ params }: PageProps<"/goal/[id]">) => {
  const { id } = await params;
  return (
    <>
      <h1>Goal &quot;{id}&quot;</h1>
      <Link href={"/signin"}>Sign in</Link>
    </>
  );
};

export default Goal;
