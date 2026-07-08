import { FieldError } from "@/app/components/field-error";
import * as inputStyles from "@/app/components/input.css";
import { Label } from "@/app/components/label";
import { field } from "@/app/styles/field.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { IconProp } from "@/app/utils/_icon";
import {
  TextField as AriaTextField,
  Input,
  Text,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField";

type TextFieldProps = AriaTextFieldProps & {
  label: string;
  placeholder?: string;
  icon?: IconProp;
  description?: string;
};

export const TextField = ({
  label,
  placeholder,
  icon: Icon,
  description,
  ...props
}: TextFieldProps) => {
  return (
    <AriaTextField className={field} {...props}>
      {({ isInvalid }) => (
        <>
          <Label>{label}</Label>
          <span className={inputStyles.root}>
            {Icon === undefined ? null : <Icon className={inputStyles.icon} />}
            <Input
              className={inputStyles.field[isInvalid ? "invalid" : "idle"]}
              placeholder={placeholder}
            />
          </span>
          {description === undefined ? null : (
            <Text
              className={sprinkles({
                text: "6",
                color: "neutral-300",
              })}
              slot="description"
            >
              {description}
            </Text>
          )}
          <FieldError />
        </>
      )}
    </AriaTextField>
  );
};
