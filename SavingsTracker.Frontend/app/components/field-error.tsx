import { error, icon } from "@/app/components/field-error.css";
import ErrorIcon from "@/app/icons/icon-error.svg";
import { FieldError as AriaFieldError } from "react-aria-components/TextField";

export const FieldError = () => {
  return (
    <AriaFieldError
      render={({ children, ...props }) => {
        return (
          <span {...props} className={error}>
            <ErrorIcon className={icon} /> {children}
          </span>
        );
      }}
    />
  );
};
