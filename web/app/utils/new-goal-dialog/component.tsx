"use client";

import { Button } from "@/app/components/button";
import * as buttonStyles from "@/app/components/button.css";
import { FieldError } from "@/app/components/field-error";
import * as inputStyles from "@/app/components/input.css";
import CrossIcon from "@/app/icons/icon-cross.svg";
import DollarIcon from "@/app/icons/icon-dollar.svg";
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
  label,
  modal,
  overlay,
  textField,
} from "@/app/utils/new-goal-dialog/styles.css";
import { validate } from "@/app/utils/validation";
import { useActionState } from "react";
import { Form, Input, Label, TextField } from "react-aria-components";
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
            <Button className={close} slot="close" autoFocus aria-label="Close">
              <CrossIcon className={closeIcon} />
            </Button>
          </header>
          <Form
            className={form}
            action={formAction}
            validationErrors={state?.errors}
          >
            <div className={fields}>
              <TextField
                className={textField}
                name="name"
                defaultValue={
                  typeof state?.values.name === "string"
                    ? state.values.name
                    : undefined
                }
                isRequired
                validate={validate(schema.name)}
              >
                <Label className={label}>Goal name</Label>
                <span className={inputStyles.root}>
                  <Input className={inputStyles.field} />
                </span>
                <FieldError />
              </TextField>
              <TextField
                className={textField}
                name="target"
                defaultValue={
                  typeof state?.values.target === "string"
                    ? state.values.target
                    : undefined
                }
                isRequired
                validate={validate(schema.target)}
              >
                <Label className={label}>Target amount</Label>
                <span className={inputStyles.root}>
                  <DollarIcon className={inputStyles.icon} />
                  <Input className={inputStyles.field} />
                </span>
                <FieldError />
              </TextField>
              {/* <div className={textField}>
                <label className={label}>Deadline (optional)</label>
                <span className={inputStyles.root}>
                  <input
                    className={inputStyles.field}
                    type="date"
                    name="deadline"
                    placeholder="Select a date"
                  />
                </span>
              </div> */}
            </div>
            <div className={actions}>
              <Button className={buttonStyles.variants.secondary} slot="close">
                Cancel
              </Button>
              <Button className={buttonStyles.variants.primary} type="submit">
                Create goal
              </Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
