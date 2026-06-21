import { getUser } from "@/app/(main)/utils/user";
import { TextField } from "@/app/components/text-field";

const ProfilePage = async () => {
  const user = await getUser();

  console.log({ user });

  return (
    <div>
      <h1>Account</h1>
      <form>
        {/* <TextField label="Full name" />
        <TextField label="Email address" /> */}
      </form>
    </div>
  );
};

export default ProfilePage;
