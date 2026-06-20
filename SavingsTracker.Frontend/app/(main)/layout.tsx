import { LayoutImpl } from "@/app/(main)/components/layout-impl";
import {
  ensureAuthCookie,
  getAuthCookie,
  getUser,
  logOut,
  setAuthCookie,
} from "@/app/utils/api";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// We have to opt out of SSR because layouts don't receive `searchParams`
// We need `searchParams` to route the dialog included in the layout
const MainLayout = async (props: LayoutProps<"/">) => {
  const cookie = await getAuthCookie();
  const user = cookie === null ? null : await getUser({ cookie });

  return (
    <Suspense>
      <LayoutImpl
        {...props}
        user={user}
        logOutAction={async () => {
          "use server";
          const result = await logOut({ cookie: await ensureAuthCookie() });
          if (!result.success) return;

          await setAuthCookie(result.data.setCookie);
          redirect("/signin");
        }}
      />
    </Suspense>
  );
};

export default MainLayout;
