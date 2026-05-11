"use client";

import { createGoal } from "@/app/(main)/actions";
import { Button } from "@/app/components/button";
import * as buttonStyles from "@/app/components/button.css";
import * as inputStyles from "@/app/components/input.css";
import CrossIcon from "@/app/icons/icon-cross.svg";
import DollarIcon from "@/app/icons/icon-dollar.svg";
import { useNewGoalDialog } from "@/app/utils/new-goal-dialog/hook";
import {
  close,
  closeIcon,
  header,
  modal,
  overlay,
} from "@/app/utils/new-goal-dialog/styles.css";
import Form from "next/form";
import {
  Dialog,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components/Modal";

export const NewGoalDialog = () => {
  const dialog = useNewGoalDialog();

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
            <Heading slot="title">New goal</Heading>
            <Button className={close} slot="close" aria-label="Close">
              <CrossIcon className={closeIcon} />
            </Button>
          </header>
          <Form action={createGoal}>
            <label>
              Goal name
              <span className={inputStyles.root}>
                <input className={inputStyles.field} name="name" />
              </span>
            </label>
            <label>
              Target amount
              <span className={inputStyles.root}>
                <DollarIcon className={inputStyles.icon} />
                <input className={inputStyles.field} name="target" />
              </span>
            </label>
            <label>
              Deadline (optional)
              <span className={inputStyles.root}>
                <input
                  className={inputStyles.field}
                  type="date"
                  name="deadline"
                />
              </span>
            </label>
            <Button className={buttonStyles.variants.secondary} slot="close">
              Cancel
            </Button>
            <Button className={buttonStyles.variants.primary} type="submit">
              Create goal
            </Button>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
