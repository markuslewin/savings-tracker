"use client";

import { DialogButton } from "@/app/(main)/components/dialog-button";
import {
  EditGoalForm,
  EditGoalFormProps,
} from "@/app/(main)/goals/[id]/components/edit-goal-form";
import { Button } from "@/app/components/button";
import { AlertDialog, Dialog } from "@/app/components/dialog";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { Goal, User } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DialogTrigger } from "react-aria-components";

type GoalActionsProps = {
  user: User | null;
  goal: Goal;
  editAction: EditGoalFormProps["submitAction"];
  deleteAction: () => Promise<void>;
};

export const GoalActions = ({
  user,
  goal,
  editAction,
  deleteAction,
}: GoalActionsProps) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DialogButton dialogId="edit-goal" variant="tertiary">
        Edit goal
      </DialogButton>
      <Dialog dialogId="edit-goal" title="Edit goal">
        <EditGoalForm goal={goal} submitAction={editAction} />
      </Dialog>
      <DialogTrigger
        isOpen={isDeleteOpen}
        onOpenChange={(isOpen) => {
          if (user === null && isOpen) {
            router.push("/signin");
            return;
          }
          setIsDeleteOpen(isOpen);
        }}
      >
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
