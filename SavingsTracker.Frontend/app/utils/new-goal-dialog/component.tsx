"use client";

import { Button } from "@/app/components/button";
import { CancelButton, Dialog } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
import * as schema from "@/app/utils/schema/goal";
import { validate } from "@/app/utils/form";
import { useActionState } from "react";
import { Form } from "react-aria-components/Form";

export const NewGoalDialog = () => {
  const [state, formAction, isPending] = useActionState(createGoal, undefined);

  return (
    <Dialog dialogId="new-goal" title="New goal">
      <Form
        className={sprinkles({
          marginBlockStart: "space-0300",
        })}
        action={formAction}
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
            defaultValue={
              typeof state?.values.name === "string"
                ? state.values.name
                : undefined
            }
            isRequired
            validate={validate(schema.name)}
          />
          <TextField
            label="Target amount"
            name="target"
            defaultValue={
              typeof state?.values.target === "string"
                ? state.values.target
                : undefined
            }
            isRequired
            validate={validate(schema.target)}
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
