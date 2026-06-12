import { borderRadius, card } from "@/app/styles/card.css";
import { circle } from "@/app/styles/circle.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { colors, outline, outlineOffset, radius } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

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
    },
  },
]);

export const radioGroup = style([
  sprinkles({
    display: "grid",
  }),
]);

export const radioGroupLabel = style([
  sprinkles({
    text: "6",
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
    text: "5",
  }),
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

export const noGoalsContainer = style([
  sprinkles({
    paddingBlock: "space-0500",
    paddingInline: "space-0200",
    border: {
      forcedColors: "dashed",
    },
    borderRadius: {
      forcedColors: "radius-16",
    },
  }),
  {
    position: "relative",
    isolation: "isolate",
  },
]);

export const noGoalsBorder = style([
  sprinkles({
    color: "neutral-600",
    display: {
      forcedColors: "none",
    },
  }),
  {
    position: "absolute",
    inset: 0,
    // Avoid disappearing sides due to rounding
    width: calc.subtract("100%", "1px"),
    height: calc.subtract("100%", "1px"),
    zIndex: -1,
  },
]);

export const noGoalsContent = style([
  sprinkles({
    marginInline: "auto",
    maxWidth: "paragraph",
    display: "grid",
    textAlign: "center",
  }),
]);

export const noGoalsIcon = style([
  sprinkles({
    marginInline: "auto",
    width: "auto",
    height: "size-0500",
    color: "neutral-400",
  }),
]);

export const noGoalsHeading = style([
  sprinkles({
    marginBlockStart: "space-0250",
    text: "2",
  }),
]);

export const noGoalsBody = style([
  sprinkles({
    marginBlockStart: "space-0250",
    color: "neutral-300",
  }),
]);
