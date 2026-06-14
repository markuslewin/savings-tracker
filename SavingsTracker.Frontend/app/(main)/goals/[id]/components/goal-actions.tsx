"use client";

import { DialogButton } from "@/app/(main)/components/dialog-button";
import { EditGoalForm } from "@/app/(main)/goals/[id]/components/edit-goal-form";
import { Button } from "@/app/components/button";
import { AlertDialog, Dialog } from "@/app/components/dialog";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { Goal } from "@/app/utils/api";
import { DialogTrigger } from "react-aria-components";

type GoalActionsProps = {
  goal: Goal;
  deleteAction: () => Promise<void>;
};

export const GoalActions = ({ goal, deleteAction }: GoalActionsProps) => {
  return (
    <>
      <DialogButton dialogId="edit-goal" variant="tertiary">
        Edit goal
      </DialogButton>
      <Dialog dialogId="edit-goal" title="Edit goal">
        <EditGoalForm goal={goal} />
      </Dialog>
      <DialogTrigger>
        <Button className={sprinkles({ color: "red-500" })} variant="tertiary">
          Delete goal
        </Button>
        <AlertDialog
          title={`Delete ${goal.name}?`}
          actionLabel="Delete goal"
          confirmAction={deleteAction}
        >
          This will permanently delete this goal and all its deposit history.
          This cannot be undone.
        </AlertDialog>
      </DialogTrigger>
    </>
  );
};
