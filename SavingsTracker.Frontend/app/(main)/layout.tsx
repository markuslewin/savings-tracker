import { NewGoalButton } from "@/app/(main)/components/new-goal-button";
import { container, header } from "@/app/(main)/layout.css";
import { breakpoints } from "@/app/styles/media";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { NewGoalDialog } from "@/app/utils/new-goal-dialog/component";
import { OptimisticSearchParams } from "@/app/utils/optimistic-search-params/component";
import Link from "next/link";

const MainLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <OptimisticSearchParams>
      <header className={header}>
        <div className={container}>
          <div
            className={sprinkles({
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "space-0200",
            })}
          >
            <Link href={"/"}>
              <picture>
                <source
                  media={breakpoints.tablet}
                  srcSet="/images/logo-large.svg"
                  width={230}
                  height={40}
                />
                <img
                  alt="Savings Tracker"
                  src={"/images/logo-small.svg"}
                  width={40}
                  height={40}
                />
              </picture>
            </Link>
            <NewGoalButton />
          </div>
        </div>
      </header>
      <main>
        <div className={container}>{children}</div>
      </main>
      <NewGoalDialog />
    </OptimisticSearchParams>
  );
};

export default MainLayout;
