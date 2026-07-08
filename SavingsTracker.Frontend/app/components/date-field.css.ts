import { gap, placeholderColor } from "@/app/styles/field.css";
import { style } from "@vanilla-extract/css";

export const button = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
  gap,
  textAlign: "start",
});

export const value = style({
  selectors: {
    "&[data-placeholder]": {
      color: placeholderColor,
    },
  },
});
