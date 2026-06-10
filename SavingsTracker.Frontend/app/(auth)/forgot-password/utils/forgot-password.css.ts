import { sprinkles } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const paragraph = style([
  {
    maxInlineSize: rem(300),
  },
  sprinkles({
    color: "neutral-300",
  }),
]);
