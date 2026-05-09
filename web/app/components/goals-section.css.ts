import { card } from "@/app/styles/card.css";
import { circle } from "@/app/styles/circle.css";
import { colors, radius } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const popover = style([
  {
    padding: rem(7),
    vars: {
      [card.vars.borderRadius]: radius["radius-08"],
    },
  },
]);

export const radioGroupLabel = style({
  paddingBlock: rem(9),
  paddingInlineStart: rem(8),
});

export const radioDot = style([
  circle.styles,
  {
    vars: {
      [circle.sizeVar]: rem(8),
      [circle.colorVar]: colors["orange-400"],
    },
  },
]);
