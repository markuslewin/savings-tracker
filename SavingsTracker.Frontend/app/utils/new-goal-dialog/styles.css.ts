import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { border, colors, size, space } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const overlay = style([
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

export const modal = style([
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

export const heading = style([sprinkles({ text: "4" })]);

export const close = style({
  position: "absolute",
  insetBlockStart: space["space-0250"],
  insetInlineEnd: space["space-0250"],
  display: "grid",
  background: "transparent",
  color: colors["neutral-400"],
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
});

export const closeIcon = style({
  width: size["size-0250"],
  height: size["size-0250"],
});

export const form = style({
  marginBlockStart: space["space-0300"],
});

export const fields = style({
  display: "grid",
  gap: space["space-0250"],
});

export const textField = style({
  display: "grid",
  gap: space["space-0125"],
});

export const label = style([sprinkles({ text: "5" })]);

export const actions = style({
  marginBlockStart: space["space-0300"],
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "end",
  gap: space["space-0200"],
});
