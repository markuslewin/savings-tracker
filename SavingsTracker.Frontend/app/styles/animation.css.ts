import { StyleRule } from "@vanilla-extract/css";

// https://tailwindcss.com/docs/transition-property
export const transition: StyleRule = {
  transitionProperty: "background-color, color, opacity",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
};
