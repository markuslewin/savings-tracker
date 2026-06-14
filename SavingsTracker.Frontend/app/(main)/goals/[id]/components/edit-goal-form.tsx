import { Button } from "@/app/components/button";
import { CancelButton } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { Goal } from "@/app/utils/api";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
import * as schema from "@/app/utils/new-goal-dialog/schema";
import { validate } from "@/app/utils/validation";
import { useActionState } from "react";
import { Form } from "react-aria-components/Form";

type EditGoalFormProps = {
  goal: Goal;
};

export const EditGoalForm = ({ goal }: EditGoalFormProps) => {
  const [state, formAction, isPending] = useActionState(createGoal, {
    values: {
      name: goal.name,
      target: goal.target.toString(),
    },
    errors: {},
  });

  return (
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
        <Button type="submit">Save changes</Button>
      </div>
    </Form>
  );
};
