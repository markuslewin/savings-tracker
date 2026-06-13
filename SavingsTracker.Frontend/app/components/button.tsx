import { button, icon } from "@/app/components/button.css";
import { IconProp } from "@/app/utils/icon";
import clsx from "clsx";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";

export type ButtonProps = AriaButtonProps & {
  variant?: keyof typeof button;
  icon?: IconProp;
};

export const Button = ({
  className,
  variant = "primary",
  icon: Icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton className={clsx(button[variant], className)} {...props}>
      <>
        {Icon === undefined ? null : <Icon className={icon} />}
        {children}
      </>
    </AriaButton>
  );
};
