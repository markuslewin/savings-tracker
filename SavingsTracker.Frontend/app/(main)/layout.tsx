import { NewGoalButton } from "@/app/(main)/components/new-goal-button";
import { container, header } from "@/app/(main)/layout.css";
import { LogoLink } from "@/app/components/logo-link";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { NewGoalDialog } from "@/app/utils/new-goal-dialog/component";
import { OptimisticSearchParams } from "@/app/utils/optimistic-search-params/component";

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
            <LogoLink />
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
