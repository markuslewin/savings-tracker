import * as fieldStyles from "@/app/styles/field.css";
import { Label as AriaLabel, LabelProps } from "react-aria-components";

export const Label = (props: LabelProps) => {
  return <AriaLabel className={fieldStyles.label} {...props} />;
};
