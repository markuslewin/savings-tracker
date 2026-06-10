import { sprinkles } from "@/app/styles/sprinkles.css";
import { size, space } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const error = style([
  {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    gap: space["space-0100"],
  },
  sprinkles({
    text: "6",
    color: "red-500",
  }),
]);

export const icon = style({
  width: size["size-0250"],
  height: size["size-0250"],
});
