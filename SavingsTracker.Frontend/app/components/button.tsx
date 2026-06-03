"use client";

import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";
import * as styles from "@/app/components/button.css";
import clsx from "clsx";

type ButtonProps = AriaButtonProps & {
  variant?: keyof typeof styles.variants;
  // todo
  icon?: "filter";
};

export const Button = ({
  className,
  variant = "primary",
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      className={clsx(styles.variants[variant], className)}
      {...props}
    >
      <>
        {icon === undefined ? null : "icon"}
        {children}
      </>
    </AriaButton>
  );
};
