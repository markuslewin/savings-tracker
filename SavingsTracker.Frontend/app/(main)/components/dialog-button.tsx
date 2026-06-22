import { Button, ButtonProps } from "@/app/components/button";
import { User } from "@/app/utils/api";
import { DialogId, useDialog } from "@/app/utils/new-goal-dialog/hook";

type DialogButton = ButtonProps & {
  dialogId: DialogId;
  user: User | null;
};

export const DialogButton = ({ dialogId, user, ...props }: DialogButton) => {
  const dialog = useDialog({ dialogId, user });

  return <Button {...props} onPress={dialog.showModal} />;
};
