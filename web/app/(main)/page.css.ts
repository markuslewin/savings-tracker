import { breakpoints } from "@/app/styles/media";
import { colors, space, sprinkles } from "@/app/styles/sprinkles.css";
import {
  textPreset1,
  textPreset2,
  textPreset4,
  textPreset5SemiBold,
} from "@/app/styles/text.css";
import { rem } from "@/app/styles/utils";
import {
  createTheme,
  createThemeContract,
  fallbackVar,
  style,
} from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const cardVars = createThemeContract({
  background: null,
  color: null,
  border: null,
});

export const card = style([
  sprinkles({
    border: "default",
    borderRadius: "radius-16",
  }),
  {
    borderColor: fallbackVar(cardVars.border, colors["neutral-600"]),
    background: fallbackVar(cardVars.background, colors["neutral-800"]),
    color: fallbackVar(cardVars.color, colors["neutral-0"]),
  },
]);

export const orangeCardTheme = createTheme(cardVars, {
  background: `linear-gradient(to right, ${colors["orange-700"]}, ${colors["orange-400"]})`,
  color: colors["neutral-0"],
  border: "hsl(0 0% 0% / 30%)",
});

export const summaryCards = style({
  display: "grid",
  gap: space["space-0200"],
  "@media": {
    [breakpoints.tablet]: {
      gridTemplateColumns: "1fr 1fr",
      gap: space["space-0300"],
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "624fr 304fr 304fr",
    },
  },
});

export const summaryCard = style({
  padding: rem(15),
  "@media": {
    [breakpoints.tablet]: {
      paddingInline: rem(19),
    },
    [breakpoints.desktop]: {
      paddingBlock: rem(19),
    },
  },
});

export const summaryTerm = style([textPreset5SemiBold]);

export const summaryDesc = style([
  sprinkles({
    marginBlockStart: "space-0400",
  }),
  textPreset1,
]);

export const monthlyCard = style([
  card,
  sprinkles({
    marginBlockStart: {
      mobile: "space-0200",
      tablet: "space-0300",
    },
  }),
  {
    padding: rem(15),
    "@media": {
      [breakpoints.tablet]: {
        padding: rem(19),
      },
    },
  },
]);

export const monthlyHeading = style([textPreset4]);

export const bars = style([
  sprinkles({
    marginBlockStart: "space-0250",
    display: "flex",
    gap: {
      mobile: "space-0100",
      tablet: "space-0200",
      desktop: "space-0250",
    },
  }),
  {
    height: rem(184),
    "@media": {
      [breakpoints.tablet]: {
        height: rem(202),
      },
    },
  },
]);

export const goalsContainer = style([
  {
    marginBlockStart: rem(52),
  },
]);

export const goalsHeading = style([textPreset2]);

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

export const noGoalsHeading = style([
  sprinkles({
    marginBlockStart: "space-0250",
  }),
  textPreset2,
]);

export const goalCards = style([
  {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
  sprinkles({
    gap: "space-0300",
  }),
]);

export const goalCard = style([
  card,
  {
    padding: rem(15),
    "@media": {
      [breakpoints.tablet]: {
        padding: rem(23),
      },
    },
  },
]);
