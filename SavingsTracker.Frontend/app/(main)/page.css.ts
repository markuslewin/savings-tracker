import { progressColor } from "@/app/components/progress.css";
import { transition } from "@/app/styles/animation.css";
import { card } from "@/app/styles/card.css";
import { columns } from "@/app/styles/columns.css";
import { breakpoints } from "@/app/styles/media";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { colors, outline, outlineOffset } from "@/app/styles/tokens";
import { fromCenter, rem } from "@/app/styles/utils";
import {
  createTheme,
  createThemeContract,
  createVar,
  style,
} from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const summaryCardDecoration = style({
  vars: {
    [card.vars.shapeLayer]:
      `no-repeat ${fromCenter(107, 74)}/${rem(200)} url(/images/pattern-star.svg)`,
  },
});

const mobileAmount = "6";
const desktopAmount = "12";

export const barsGrid = style([
  columns,
  sprinkles({
    columnsNumber: {
      mobile: mobileAmount,
      desktop: desktopAmount,
    },
    columnsSpace: {
      mobile: "space-0100",
      tablet: "space-0200",
      desktop: "space-0250",
    },
  }),
]);

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
  sprinkles({
    text: {
      mobile: "7",
      tablet: "6",
    },
  }),
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

export const goalCards = style([
  {
    display: "grid",
    ...transition,
    selectors: {
      "&[data-pending]": {
        opacity: 0.5,
      },
    },
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
  dot: null,
  deadline: null,
});

const greyCard = style([
  card.styles.grey,
  {
    vars: {
      [card.vars.shapeLayer]:
        `no-repeat top center/${rem(408)} url(/images/pattern-grid.svg)`,
    },
  },
]);

export const noProgress = style([
  greyCard,
  createTheme(goalCardVars, {
    accent: colors["neutral-400"],
    dot: colors["neutral-300"],
    deadline: colors["white-alpha-70"],
  }),
]);

export const inProgress = style([
  greyCard,
  progressColor.orange,
  createTheme(goalCardVars, {
    accent: colors["orange-400"],
    dot: colors["neutral-300"],
    deadline: colors["white-alpha-70"],
  }),
]);

export const inProgressClose = style([
  card.styles.orange,
  progressColor.white,
  createTheme(goalCardVars, {
    accent: colors["neutral-0"],
    dot: colors["white-alpha-30"],
    deadline: colors["neutral-0"],
  }),
]);

export const complete = style([
  greyCard,
  progressColor.green,
  createTheme(goalCardVars, {
    accent: colors["green-500"],
    dot: colors["neutral-300"],
    deadline: colors["white-alpha-70"],
  }),
]);

export const goalCard = style([
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
