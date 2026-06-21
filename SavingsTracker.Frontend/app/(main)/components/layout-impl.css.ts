import { sprinkles } from "@/app/styles/sprinkles.css";
import { style, styleVariants } from "@vanilla-extract/css";

const userOptionBase = style([
  sprinkles({
    padding: "space-0100",
    textAlign: "start",
    textDecoration: "none",
    background: "transparent",
  }),
]);

export const userOption = styleVariants({
  grey: [
    userOptionBase,
    sprinkles({ color: { default: "neutral-300", hover: "neutral-0" } }),
  ],
  red: [userOptionBase, sprinkles({ color: "red-500" })],
});
