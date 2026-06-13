import { Button } from "@/app/components/button";
import { close, dialog, header, overlay } from "@/app/components/dialog.css";
import CrossIcon from "@/app/icons/icon-cross.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { DialogId, useDialog } from "@/app/utils/new-goal-dialog/hook";
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
}: {
  title: string;
  actionLabel: string;
  children: ReactNode;
}) => {
  return (
    <ModalOverlay className={overlay}>
      <AriaModal>
        <AriaDialog className={dialog} role="alertdialog">
          <Close />
          <Heading>{title}</Heading>
          {children}
          <Button variant="secondary">Cancel</Button>
          <Button>{actionLabel}</Button>
        </AriaDialog>
      </AriaModal>
    </ModalOverlay>
  );
};
