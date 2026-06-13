import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { border, colors, space } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const overlay = style([
  sprinkles({
    padding: "space-0200",
  }),
  {
    position: "fixed",
    inset: 0,
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: `minmax(auto, ${rem(680)})`,
    justifyContent: "center",
    alignItems: "center",
    background: colors["neutral-900-alpha-90"],
  },
]);

export const dialog = style([
  card.grey,
  sprinkles({
    boxSpaceBlock: {
      mobile: "space-0250",
      tablet: "space-0400",
    },
    boxSpaceInline: {
      mobile: "space-0200",
      tablet: "space-0400",
    },
  }),
  {
    position: "relative",
    isolation: "isolate",
  },
]);

export const header = style({
  paddingBlockEnd: space["space-0300"],
  borderBlockEnd: border.solid,
  borderColor: colors["neutral-700"],
});

export const close = style([
  sprinkles({
    color: {
      default: "neutral-400",
      hover: "neutral-0",
    },
    transition: "default",
  }),
  {
    position: "absolute",
    insetBlockStart: space["space-0250"],
    insetInlineEnd: space["space-0250"],
    display: "grid",
    background: "transparent",
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        insetBlockStart: "50%",
        insetInlineStart: "50%",
        translate: "-50% -50%",
        width: rem(48),
        height: rem(48),
      },
    },
  },
]);
