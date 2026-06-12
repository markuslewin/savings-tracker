"use client";

import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import CrossIcon from "@/app/icons/icon-cross.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
import { useNewGoalDialog } from "@/app/utils/new-goal-dialog/hook";
import * as schema from "@/app/utils/new-goal-dialog/schema";
import {
  close,
  header,
  modal,
  overlay,
} from "@/app/utils/new-goal-dialog/styles.css";
import { validate } from "@/app/utils/validation";
import { useActionState } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { Form } from "react-aria-components/Form";
import {
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components/Modal";

export const NewGoalDialog = () => {
  const dialog = useNewGoalDialog();
  const [state, formAction, isPending] = useActionState(createGoal, undefined);

  return (
    <ModalOverlay
      className={overlay}
      isDismissable
      isOpen={dialog.open}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          dialog.showModal();
        } else {
          dialog.close();
        }
      }}
    >
      <Modal className={modal}>
        <Dialog>
          <header className={header}>
            <Heading
              className={sprinkles({
                text: "4",
              })}
              slot="title"
            >
              New goal
            </Heading>
            <AriaButton
              className={close}
              slot="close"
              autoFocus
              aria-label="Close"
            >
              <CrossIcon
                className={sprinkles({
                  width: "size-0250",
                  height: "size-0250",
                })}
              />
            </AriaButton>
          </header>
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
              <Button variant="secondary" slot="close">
                Cancel
              </Button>
              <Button type="submit">Create goal</Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
