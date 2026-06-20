import { borderColor, borderRadius, card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { colors, radius } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const popover = style([
  card.grey,
  sprinkles({
    width: "full",
    maxWidth: "popover",
    boxSpace: "space-0100",
  }),
  {
    overflowY: "auto",
    scrollbarWidth: "thin",
    vars: {
      [borderRadius]: radius["radius-08"],
      [borderColor]: colors["neutral-700"],
    },
  },
]);
