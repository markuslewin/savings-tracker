"use client";

import { DialogButton } from "@/app/(main)/components/dialog-button";
import { container, header } from "@/app/(main)/layout.css";
import { LogoLink } from "@/app/components/logo-link";
import PlusIcon from "@/app/icons/icon-plus.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { NewGoalDialog } from "@/app/utils/new-goal-dialog/component";
import { OptimisticSearchParams } from "@/app/utils/optimistic-search-params/component";

const MainLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <OptimisticSearchParams>
      <div>
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
              <DialogButton dialogId="new-goal" icon={PlusIcon}>
                New goal
              </DialogButton>
            </div>
          </div>
        </header>
        <main
          className={sprinkles({
            paddingBlock: {
              mobile: "space-0400",
              tablet: "space-0500",
              desktop: "space-0600",
            },
          })}
        >
          <div className={container}>{children}</div>
        </main>
        <NewGoalDialog />
      </div>
    </OptimisticSearchParams>
  );
};

export default MainLayout;
