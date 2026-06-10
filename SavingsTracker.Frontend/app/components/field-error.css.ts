import { size, space, sprinkles } from "@/app/styles/sprinkles.css";
import { colors } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const error = style([
  {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    gap: space["space-0100"],
    color: colors["red-500"],
  },
  sprinkles({
    text: "6",
  }),
]);

export const icon = style({
  width: size["size-0250"],
  height: size["size-0250"],
});
