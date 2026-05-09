import { card } from "@/app/styles/card.css";
import { circle } from "@/app/styles/circle.css";
import {
  colors,
  outline,
  outlineOffset,
  radius,
  sprinkles,
} from "@/app/styles/sprinkles.css";
import { textPreset5, textPreset6 } from "@/app/styles/text.css";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const popover = style([
  card.styles.grey,
  sprinkles({
    width: "full",
    maxWidth: "popover",
  }),
  {
    padding: rem(7),
    vars: {
      [card.vars.borderRadius]: radius["radius-08"],
    },
  },
]);

export const radioGroup = style([
  sprinkles({
    display: "grid",
  }),
]);

export const radioGroupLabel = style([
  textPreset6,
  sprinkles({
    textTransform: "uppercase",
    color: "neutral-300",
  }),
  {
    paddingBlock: rem(9),
    paddingInlineStart: rem(8),
  },
]);

export const radios = style([
  sprinkles({
    display: "grid",
    gap: "space-0025",
  }),
]);

export const radio = style([
  sprinkles({
    padding: "space-0100",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    gap: "space-0100",
  }),
  textPreset5,
]);

export const radioCircle = style([
  sprinkles({
    border: "solid",
    borderColor: "neutral-500",
    borderRadius: "radius-full",
    width: "size-0200",
    height: "size-0200",
    display: "grid",
    placeItems: "center",
  }),
  {
    selectors: {
      [`${radio}[data-focus-visible] &`]: {
        outline: outline.default,
        outlineOffset: outlineOffset.default,
      },
    },
  },
]);

export const radioDot = style([
  circle.styles,
  {
    vars: {
      [circle.sizeVar]: rem(8),
      [circle.colorVar]: colors["orange-400"],
    },
  },
]);

export const radioLabel = style([
  {
    color: colors["neutral-300"],
    selectors: {
      "&[data-selected]": { color: colors["neutral-0"] },
    },
  },
]);
