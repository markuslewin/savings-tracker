import { style } from "@vanilla-extract/css";

// https://tailwindcss.com/docs/display#screen-reader-only
export const srOnly = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  borderWidth: 0,
});
