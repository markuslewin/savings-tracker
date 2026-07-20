import { button, content, icon, spinner } from "@/app/components/button.css";
import { ProgressCircle } from "@/app/components/progress-circle";
import { IconProp } from "@/app/utils/_icon";
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
      <span className={content[props.isPending ? "hidden" : "visible"]}>
        <>
          {Icon === undefined ? null : <Icon className={icon} />}
          {children}
        </>
      </span>
      <ProgressCircle
        className={spinner}
        state={props.isPending ? "visible" : "hidden"}
      />
    </AriaButton>
  );
};
