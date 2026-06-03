"use client";

import * as inputStyles from "@/app/components/input.css";
import * as styles from "@/app/utils/new-goal-dialog/styles.css";
import {
  TextField as AriaTextField,
  FieldError,
  Input,
  Label,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";

type TextFieldProps = AriaTextFieldProps & {
  label: string;
};

export const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <AriaTextField className={styles.textField} {...props}>
      <Label className={styles.label}>{label}</Label>
      <span className={inputStyles.root}>
        <Input className={inputStyles.field} />
      </span>
      <FieldError />
    </AriaTextField>
  );
};
