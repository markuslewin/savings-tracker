import { breakpoints } from "@/app/styles/media";
import {
  colors,
  outline,
  outlineOffset,
  space,
  sprinkles,
} from "@/app/styles/sprinkles.css";
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
  createVar,
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
    border: "solid",
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
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: space["space-0300"],
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "repeat(4, 1fr)",
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

export const barsGrid = style([
  sprinkles({
    gap: {
      mobile: "space-0100",
      tablet: "space-0200",
      desktop: "space-0250",
    },
  }),
  {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    "@media": {
      [breakpoints.desktop]: {
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
]);

const mobileAmount = 6;
const desktopAmount = 12;
export const barsGridItem = style([
  {
    display: "none",
    selectors: {
      [`&:nth-last-child(-n + ${mobileAmount})`]: {
        display: "block",
      },
    },
    "@media": {
      [breakpoints.desktop]: {
        selectors: {
          [`&:nth-last-child(-n + ${desktopAmount})`]: {
            display: "block",
          },
        },
      },
    },
  },
]);

export const bars = style([
  barsGrid,
  sprinkles({
    marginBlockStart: "space-0250",
    display: "grid",
    alignItems: "end",
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

export const barsAmounts = createVar();
export const barAmount = createVar();

export const bar = style([
  {
    height: calc.multiply(
      calc.divide(barAmount, `max(${barsAmounts})`),
      "100%",
    ),
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
    "@media": {
      [breakpoints.tablet]: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      },
      [breakpoints.desktop]: {
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gridAutoFlow: "dense",
      },
    },
  },
  sprinkles({
    gap: "space-0300",
  }),
]);

export const clickableContainerItem = style([
  {
    selectors: {
      "&:focus-visible": {
        outline: "none",
      },
      "&::before": {
        content: "",
        position: "absolute",
        inset: 0,
        zIndex: 1,
      },
    },
  },
]);
export const clickableContainer = style([
  {
    position: "relative",
    isolation: "isolate",
    selectors: {
      [`&:has(${clickableContainerItem}:focus-visible)`]: {
        outline: outline.default,
        outlineOffset: outlineOffset.default,
      },
    },
  },
]);

const goalCardVars = createThemeContract({
  accent: null,
  track: null,
  dot: null,
  deadline: null,
});

export const noProgress = style([
  createTheme(goalCardVars, {
    accent: colors["neutral-400"],
    track: colors["neutral-700"],
    dot: colors["neutral-300"],
    deadline: colors["white-alpha-70"],
  }),
]);

export const inProgress = style([
  createTheme(goalCardVars, {
    accent: colors["orange-400"],
    track: colors["neutral-700"],
    dot: colors["neutral-300"],
    deadline: colors["white-alpha-70"],
  }),
]);

export const inProgressClose = style([
  orangeCardTheme,
  createTheme(goalCardVars, {
    accent: colors["neutral-0"],
    track: colors["orange-800"],
    dot: colors["white-alpha-30"],
    deadline: colors["neutral-0"],
  }),
]);

export const complete = style([
  createTheme(goalCardVars, {
    accent: colors["green-500"],
    track: colors["neutral-700"],
    dot: colors["neutral-300"],
    deadline: colors["white-alpha-70"],
  }),
]);

export const goalCard = style([
  card,
  {
    display: "flex",
    flexDirection: "column",
    padding: rem(15),
    selectors: {
      "&:nth-child(4n - 3)": {
        minHeight: rem(260),
      },
      "&:nth-child(4n)": {
        minHeight: rem(260),
      },
      [`&:has(${clickableContainerItem}:focus-visible)`]: {
        outline: outline[4],
        outlineOffset: outlineOffset[4],
      },
    },
    "@media": {
      [breakpoints.tablet]: {
        padding: rem(23),
        selectors: {
          "&:nth-child(4n - 3)": {
            gridColumn: "span 2",
            minHeight: "auto",
          },
          "&:nth-child(4n)": {
            gridColumn: "span 2",
            minHeight: "auto",
          },
        },
      },
      [breakpoints.desktop]: {
        selectors: {
          "&:nth-child(4n - 3)": {
            gridColumn: "auto",
          },
          "&:nth-child(4n)": {
            gridColumn: "auto",
          },
          "&:nth-child(8n - 7)": {
            gridColumn: "span 2",
          },
          "&:nth-child(8n - 6)": {
            gridColumn: 1,
          },
          "&:nth-child(8n - 5)": {
            gridColumn: 2,
          },
          "&:nth-child(8n - 4)": {
            gridRow: "span 2",
          },
          "&:nth-child(8n - 3)": {
            gridColumn: "2 / span 2",
          },
          "&:nth-child(8n - 2)": {
            gridColumn: 2,
          },
          "&:nth-child(8n - 1)": {
            gridColumn: 3,
          },
          "&:nth-child(8n)": {
            gridRow: "span 2",
          },
        },
      },
    },
  },
]);

export const tag = style([{ paddingBlock: rem(3), paddingInline: rem(9) }]);

export const goalCardPercent = style([{ color: goalCardVars.accent }]);

export const progressTrack = style([{ background: goalCardVars.track }]);

export const progressFill = style([
  {
    backgroundColor: goalCardVars.accent,
    backgroundImage: `repeating-linear-gradient(-60deg, hsl(0 0% 6% / 10%), hsl(0 0% 6% / 10%) ${rem(2)}, transparent ${rem(2)}, transparent ${rem(7.75)})`,
    backgroundOrigin: "border-box",
  },
]);

export const dot = style([
  {
    borderTop: `${rem(4)} solid`,
    borderColor: goalCardVars.dot,
    width: rem(4),
    height: rem(4),
    borderRadius: 9999,
  },
]);

export const goalCardDeadline = style([{ color: goalCardVars.deadline }]);
