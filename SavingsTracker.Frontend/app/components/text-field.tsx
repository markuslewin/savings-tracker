import { FieldError } from "@/app/components/field-error";
import * as inputStyles from "@/app/components/input.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { IconProp } from "@/app/utils/_icon";
import {
  TextField as AriaTextField,
  Input,
  Label,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";

type TextFieldProps = AriaTextFieldProps & {
  label: string;
  placeholder?: string;
  icon?: IconProp;
};

export const TextField = ({
  label,
  placeholder,
  icon: Icon,
  ...props
}: TextFieldProps) => {
  return (
    <AriaTextField
      className={sprinkles({
        stack: "space-0125",
      })}
      {...props}
    >
      {({ isInvalid }) => (
        <>
          <Label className={sprinkles({ text: "5" })}>{label}</Label>
          <span className={inputStyles.root}>
            {Icon === undefined ? null : <Icon className={inputStyles.icon} />}
            <Input
              className={inputStyles.field[isInvalid ? "invalid" : "idle"]}
              placeholder={placeholder}
            />
          </span>
          <FieldError />
        </>
      )}
    </AriaTextField>
  );
};
