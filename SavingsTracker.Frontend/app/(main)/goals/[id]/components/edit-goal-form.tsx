import { Button } from "@/app/components/button";
import { CancelButton } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { Goal } from "@/app/utils/api";
import { FormAction } from "@/app/utils/form";
import { formatDollarsInput } from "@/app/utils/locale";
import { useActionState } from "react";
import { Form } from "react-aria-components/Form";

export type EditGoalFormProps = {
  goal: Goal;
  submitAction: FormAction<"name" | "target">;
};

export const EditGoalForm = ({ goal, submitAction }: EditGoalFormProps) => {
  const [state, dispatch, isPending] = useActionState(submitAction, {
    values: {
      name: goal.name,
      target: formatDollarsInput(goal.target),
    },
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
          defaultValue={state.values.name}
          isRequired
        />
        <TextField
          label="Target amount"
          name="target"
          defaultValue={state.values.target}
          isRequired
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
