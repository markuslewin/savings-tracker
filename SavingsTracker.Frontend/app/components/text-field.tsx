import * as inputStyles from "@/app/components/input.css";
import * as styles from "@/app/utils/new-goal-dialog/styles.css";
import { ReactNode } from "react";
import {
  TextField as AriaTextField,
  FieldError,
  Input,
  Label,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";

type TextFieldProps = AriaTextFieldProps & {
  label: string;
  placeholder?: string;
  icon?: ({
    className,
  }: {
    className: string;
  }) => ReactNode | Promise<ReactNode>;
};

export const TextField = ({
  label,
  placeholder,
  icon: Icon,
  ...props
}: TextFieldProps) => {
  return (
    <AriaTextField className={styles.textField} {...props}>
      <Label className={styles.label}>{label}</Label>
      <span className={inputStyles.root}>
        {Icon === undefined ? null : <Icon className={inputStyles.icon} />}
        <Input className={inputStyles.field} placeholder={placeholder} />
      </span>
      <FieldError />
    </AriaTextField>
  );
};
