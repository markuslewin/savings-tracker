import { Button, ButtonProps } from "@/app/components/button";
import { DialogId, useDialog } from "@/app/utils/new-goal-dialog/hook";

type DialogButton = ButtonProps & {
  dialogId: DialogId;
};

export const DialogButton = ({ dialogId, ...props }: DialogButton) => {
  const dialog = useDialog({ dialogId });

  return <Button {...props} onPress={dialog.showModal} />;
};
