import { LayoutImpl } from "@/app/(main)/components/layout-impl";
import { getUser } from "@/app/(main)/utils/user";
import { ensureAuthCookie, logOut, setAuthCookie } from "@/app/utils/api";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type MainLayoutProps = LayoutProps<"/">;

const MainLayout = async (props: MainLayoutProps) => {
  return (
    // We have to opt out of SSR because layouts don't receive `searchParams`
    // We need `searchParams` to route the dialog included in the layout
    <Suspense>
      <MainLayoutCore {...props} />
    </Suspense>
  );
};

export default MainLayout;

type MainLayoutCoreProps = MainLayoutProps;

const MainLayoutCore = async (props: MainLayoutCoreProps) => {
  const user = await getUser();

  return (
    <LayoutImpl
      {...props}
      user={user}
      logOutAction={async () => {
        "use server";
        const response = await logOut({ cookie: await ensureAuthCookie() });
        await setAuthCookie(response.data.setCookie);
        redirect("/signin");
      }}
    />
  );
};
