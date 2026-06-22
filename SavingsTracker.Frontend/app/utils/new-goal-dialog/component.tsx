"use client";

import { Button } from "@/app/components/button";
import { CancelButton, Dialog } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { User } from "@/app/utils/api";
import { validate } from "@/app/utils/form";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
import { name, target } from "@/app/utils/schema/goal";
import { useActionState } from "react";
import { Form } from "react-aria-components/Form";

type NewGoalDialogProps = {
  user: User | null;
};

export const NewGoalDialog = ({ user }: NewGoalDialogProps) => {
  const [state, dispatch, isPending] = useActionState(createGoal, {
    values: {
      name: "",
      target: "",
    },
  });

  return (
    <Dialog dialogId="new-goal" user={user} title="New goal">
      <Form
        className={sprinkles({
          marginBlockStart: "space-0300",
        })}
        action={dispatch}
        validationErrors={state?.errors}
      >
        <div
          className={sprinkles({
            stack: "space-0250",
          })}
        >
          <TextField
            label="Goal name"
            name="name"
            defaultValue={state.values.name}
            isRequired
            validate={validate(name)}
          />
          <TextField
            label="Target amount"
            name="target"
            defaultValue={state.values.target}
            isRequired
            validate={validate(target)}
          />
        </div>
        <div
          className={sprinkles({
            marginBlockStart: "space-0300",
            cluster: "space-0200",
            justifyContent: "end",
          })}
        >
          <CancelButton />
          <Button type="submit">Create goal</Button>
        </div>
      </Form>
    </Dialog>
  );
};
