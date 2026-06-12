import ErrorIcon from "@/app/icons/icon-error.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { FieldError as AriaFieldError } from "react-aria-components/FieldError";

export const FieldError = () => {
  return (
    <AriaFieldError
      render={({ children, ...props }) => {
        return (
          <span
            {...props}
            className={sprinkles({
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "center",
              gap: "space-0100",
              text: "6",
              color: "red-500",
            })}
          >
            <ErrorIcon
              className={sprinkles({
                width: "size-0250",
                height: "size-0250",
              })}
            />
            {children}
          </span>
        );
      }}
    />
  );
};
