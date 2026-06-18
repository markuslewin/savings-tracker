import { columns } from "@/app/styles/columns.css";
import { breakpoints } from "@/app/styles/media";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const fallback = style({
  // Best-effort guess
  height: rem(184),
  "@media": {
    [breakpoints.tablet]: {
      height: rem(202),
    },
  },
});

export const noDeposits = style({
  minHeight: rem(120),
  display: "grid",
  placeItems: "center",
});

export const barsContainer = style({
  display: "grid",
  gridTemplateRows: "1fr auto",
  height: rem(184),
  "@media": {
    [breakpoints.tablet]: {
      height: rem(202),
    },
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
    display: "grid",
    alignItems: "end",
  }),
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
