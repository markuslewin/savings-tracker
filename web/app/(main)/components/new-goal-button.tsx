"use client";

import { Button } from "@/app/components/button";
import * as buttonStyles from "@/app/components/button.css";
import PlusIcon from "@/app/icons/icon-plus.svg";
import { useNewGoalDialog } from "@/app/utils/new-goal-dialog/hook";

export const NewGoalButton = () => {
  const dialog = useNewGoalDialog();

  return (
    <>
      <Button
        className={buttonStyles.variants.primary}
        onPress={dialog.showModal}
      >
        <PlusIcon className={buttonStyles.icon} />
        New goal
      </Button>
    </>
  );
};
