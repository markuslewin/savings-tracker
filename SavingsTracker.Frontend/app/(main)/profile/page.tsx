import { split } from "@/app/(main)/goals/[id]/page.css";
import { ProfileForm } from "@/app/(main)/profile/utils/ProfileForm";
import { ensureUser } from "@/app/(main)/utils/user";
import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { ensureAuthCookie, updateUser } from "@/app/utils/api";
import clsx from "clsx";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const user = await ensureUser();

  return (
    <div className={split}>
      <div
        className={sprinkles({
          stack: "space-0400",
        })}
      >
        <h1 className={sprinkles({ text: "1" })}>Profile</h1>
        <div
          className={clsx(
            card.grey,
            sprinkles({
              boxSpace: { mobile: "space-0200", tablet: "space-0300" },
              stack: "space-0300",
            }),
          )}
        >
          <h2 className={sprinkles({ text: "4" })}>Edit profile</h2>
          <ProfileForm
            action={async (_, formData) => {
              "use server";
              const cookie = await ensureAuthCookie();

              const values = Object.fromEntries(formData) as Record<
                string,
                string
              >;
              const parsed = z
                .object({
                  fullName: z.string(),
                  email: z.string(),
                })
                .safeParse(values);
              if (!parsed.success)
                return {
                  values,
                  errors: z.flattenError(parsed.error).fieldErrors,
                };

              const response = await updateUser({
                cookie,
                data: parsed.data,
              });
              switch (response.status) {
                case 204:
                  revalidatePath("/profile");
                  redirect("/profile");
                case 400:
                  return {
                    values,
                    errors: response.json.errors,
                  };
                case 401:
                  redirect("/signin");
              }
            }}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
