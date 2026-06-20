import { LayoutImpl } from "@/app/(main)/components/layout-impl";
import { Suspense } from "react";

// We have to opt out of SSR because layouts don't receive `searchParams`
// We need `searchParams` to route the dialog included in the layout
const MainLayout = (props: LayoutProps<"/">) => {
  return (
    <Suspense>
      <LayoutImpl {...props} />;
    </Suspense>
  );
};

export default MainLayout;
