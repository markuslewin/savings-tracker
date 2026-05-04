import { breakpoints } from "@/app/styles/media";
import { colors, space, sprinkles } from "@/app/styles/sprinkles.css";
import {
  textPreset1,
  textPreset2,
  textPreset4,
  textPreset5SemiBold,
} from "@/app/styles/text.css";
import { rem } from "@/app/styles/utils";
import { createThemeContract, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const card = style([
  sprinkles({
    border: "default",
    borderColor: "neutral-600",
    borderRadius: "radius-16",
    background: "neutral-800",
    color: "neutral-0",
  }),
]);

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

export const summaryTerm = style([textPreset5SemiBold]);

export const summaryDesc = style([
  sprinkles({
    marginBlockStart: "space-0400",
  }),
  textPreset1,
]);

export const monthlyContainer = style([
  card,
  sprinkles({
    marginBlockStart: {
      mobile: "space-0200",
      tablet: "space-0300",
    },
  }),
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

const goalCardVars = createThemeContract({
  background: null,
  color: null,
  border: null,
});

export const goalCard = style([
  sprinkles({
    border: "default",
    borderRadius: "radius-16",
  }),
  {
    borderColor: goalCardVars.border,
    padding: rem(15),
    background: goalCardVars.background,
    vars: {
      [goalCardVars.background]: colors["neutral-800"],
      [goalCardVars.color]: colors["neutral-0"],
      [goalCardVars.border]: colors["neutral-600"],
    },
    selectors: {
      "&:nth-child(4n - 3)": {
        vars: {
          [goalCardVars.background]: `linear-gradient(to right, ${colors["orange-700"]}, ${colors["orange-400"]})`,
          [goalCardVars.color]: colors["neutral-0"],
          [goalCardVars.border]: "hsl(0 0% 0% / 30%)",
        },
      },
    },
    "@media": {
      [breakpoints.tablet]: {
        padding: rem(23),
      },
    },
  },
]);
