"use client";

import { Button, ButtonProps } from "@/app/components/button";
import { useTransition } from "react";

type ActionButtonProps = ButtonProps & {
  action: () => Promise<void>;
};

export const ActionButton = ({
  action,
  children,
  ...props
}: ActionButtonProps) => {
  const [isPending, transition] = useTransition();
  return (
    <Button
      onPress={() => {
        transition(() => {
          action();
        });
      }}
      isPending={isPending}
      {...props}
    >
      <>{children}</>
    </Button>
  );
};
