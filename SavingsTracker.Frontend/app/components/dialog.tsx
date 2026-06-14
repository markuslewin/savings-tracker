import { ActionButton } from "@/app/components/action-button";
import { base as buttonBase } from "@/app/components/button.css";
import {
  alertConfirm,
  close,
  dialog,
  header,
  overlay,
} from "@/app/components/dialog.css";
import CrossIcon from "@/app/icons/icon-cross.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { Hr } from "@/app/utils/hr";
import { DialogId, useDialog } from "@/app/utils/new-goal-dialog/hook";
import clsx from "clsx";
import { ReactNode } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  Heading,
  ModalOverlay,
} from "react-aria-components/Modal";

type ModalProps = {
  dialogId: DialogId;
  children: ReactNode;
};

const Modal = ({ dialogId, children }: ModalProps) => {
  const dialog = useDialog({ dialogId });

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
      <AriaModal>{children}</AriaModal>
    </ModalOverlay>
  );
};

const Close = () => {
  return (
    <AriaButton className={close} slot="close" autoFocus aria-label="Close">
      <CrossIcon
        className={sprinkles({
          width: "size-0250",
          height: "size-0250",
        })}
      />
    </AriaButton>
  );
};

export const Dialog = ({
  dialogId,
  title,
  children,
}: {
  dialogId: DialogId;
  title: string;
  children: ReactNode;
}) => {
  return (
    <Modal dialogId={dialogId}>
      <AriaDialog className={dialog}>
        <header className={header}>
          <Heading
            className={sprinkles({
              text: "4",
            })}
            slot="title"
          >
            {title}
          </Heading>
          <Close />
        </header>
        {children}
      </AriaDialog>
    </Modal>
  );
};

export const AlertDialog = ({
  title,
  actionLabel,
  children,
  confirmAction,
}: {
  title: string;
  actionLabel: string;
  children: ReactNode;
  confirmAction: () => Promise<void>;
}) => {
  return (
    <ModalOverlay className={overlay}>
      <AriaModal>
        <AriaDialog
          className={clsx(
            dialog,
            sprinkles({
              stack: "space-0300",
            }),
          )}
          role="alertdialog"
        >
          <Close />
          <div
            className={sprinkles({
              stack: "space-0150",
            })}
          >
            <Heading
              className={sprinkles({
                text: "4",
              })}
            >
              {title}
            </Heading>
            <div
              className={sprinkles({
                opacity: "0.8",
              })}
            >
              {children}
            </div>
          </div>
          <Hr color={"neutral-700"} />
          <div
            className={sprinkles({
              cluster: "space-0200",
              justifyContent: "end",
            })}
          >
            <CancelButton />
            <ActionButton
              className={clsx(
                alertConfirm,
                sprinkles({
                  background: "red-500",
                }),
              )}
              action={confirmAction}
            >
              {actionLabel}
            </ActionButton>
          </div>
        </AriaDialog>
      </AriaModal>
    </ModalOverlay>
  );
};

export const CancelButton = () => {
  return (
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
  );
};
