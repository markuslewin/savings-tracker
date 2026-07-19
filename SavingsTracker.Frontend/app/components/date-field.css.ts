import { gap, placeholderColor } from "@/app/styles/field.css";
import { colors, space } from "@/app/styles/tokens";
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

export const clear = style({
  justifySelf: "start",
  marginInlineStart: space["space-0100"],
  background: "transparent",
  color: colors["neutral-0"],
});
