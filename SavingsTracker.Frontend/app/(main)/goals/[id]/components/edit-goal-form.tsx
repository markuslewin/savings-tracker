import { Button } from "@/app/components/button";
import { CancelButton } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { Goal } from "@/app/utils/api";
import * as schema from "@/app/utils/new-goal-dialog/schema";
import { validate } from "@/app/utils/validation";
import { useActionState } from "react";
import { Form, FormProps } from "react-aria-components/Form";

type State = {
  values: {
    name: string;
    target: string;
  };
  // todo: Field names?
  errors: FormProps["validationErrors"];
};

export type EditGoalFormProps = {
  goal: Goal;
  submitAction: (previousState: State, formData: FormData) => Promise<State>;
};

export const EditGoalForm = ({ goal, submitAction }: EditGoalFormProps) => {
  const [state, dispatch, isPending] = useActionState(submitAction, {
    values: {
      name: goal.name,
      target: goal.target.toString(),
    },
    errors: undefined,
  });

  return (
    <Form
      className={sprinkles({
        marginBlockStart: "space-0300",
      })}
      action={dispatch}
      validationErrors={state.errors}
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
            typeof state.values.name === "string"
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
            typeof state.values.target === "string"
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
