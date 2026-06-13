"use client";

import { Button } from "@/app/components/button";
import { base as buttonBase } from "@/app/components/button.css";
import { Dialog } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
import * as schema from "@/app/utils/new-goal-dialog/schema";
import { validate } from "@/app/utils/validation";
import clsx from "clsx";
import { useActionState } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
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
          <AriaButton
            className={clsx(
              buttonBase,
              sprinkles({
                borderColor: "neutral-600",
                background: {
                  default: "neutral-700",
                  hover: "neutral-800",
                },
                color: "neutral-0",
              }),
            )}
            slot="close"
          >
            Cancel
          </AriaButton>
          <Button type="submit">Create goal</Button>
        </div>
      </Form>
    </Dialog>
  );
};
