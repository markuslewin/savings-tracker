import { Button } from "@/app/components/button";
import { DateField } from "@/app/components/date-field";
import { CancelButton, Dialog } from "@/app/components/dialog";
import { TextField } from "@/app/components/text-field";
import DollarIcon from "@/app/icons/icon-dollar.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { User } from "@/app/utils/api";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
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
            placeholder="e.g. MacBook Pro M4"
            defaultValue={state.values.name}
            isRequired
          />
          <TextField
            label="Target amount"
            icon={DollarIcon}
            name="target"
            placeholder="0.00"
            defaultValue={state.values.target}
            isRequired
          />
          <DateField label="Deadline (optional)" name="deadline" />
        </div>
        <div
          className={sprinkles({
            marginBlockStart: "space-0300",
            cluster: "space-0200",
            justifyContent: "end",
          })}
        >
          <CancelButton />
          <Button type="submit" isPending={isPending}>
            Create goal
          </Button>
        </div>
      </Form>
    </Dialog>
  );
};
