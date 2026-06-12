"use client";

import { Button } from "@/app/components/button";
import { TextField } from "@/app/components/text-field";
import CrossIcon from "@/app/icons/icon-cross.svg";
import { createGoal } from "@/app/utils/new-goal-dialog/action";
import { useNewGoalDialog } from "@/app/utils/new-goal-dialog/hook";
import * as schema from "@/app/utils/new-goal-dialog/schema";
import {
  actions,
  close,
  closeIcon,
  fields,
  form,
  header,
  heading,
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
            <Heading className={heading} slot="title">
              New goal
            </Heading>
            <AriaButton
              className={close}
              slot="close"
              autoFocus
              aria-label="Close"
            >
              <CrossIcon className={closeIcon} />
            </AriaButton>
          </header>
          <Form
            className={form}
            action={formAction}
            validationErrors={state?.errors}
          >
            <div className={fields}>
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
            <div className={actions}>
              <Button slot="close">Cancel</Button>
              <Button type="submit">Create goal</Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
