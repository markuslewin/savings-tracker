import { style } from "@vanilla-extract/css";
import { quote as layoutQuote, quoteBleed } from "@/app/(auth)/layout.css";
import { card } from "@/app/styles/card.css";
import { textPreset1, textPreset4 } from "@/app/styles/text.css";
import { calc } from "@vanilla-extract/css-utils";
import { rem } from "@/app/styles/utils";
import { breakpoints } from "@/app/styles/media";
import { space } from "@/app/styles/sprinkles.css";

export const quote = style([
  layoutQuote,
  card.styles.orange,
  {
    padding: calc.subtract(quoteBleed, rem(1)),
    "@media": {
      [breakpoints.desktop]: {
        display: "grid",
      },
    },
  },
]);

export const quoteFigure = style({
  display: "grid",
  gridTemplateRows: "1fr auto 1fr",
  gridTemplateAreas: `
    "."
    "text"
    "source"
  `,
});

export const quoteText = style([
  {
    gridArea: "text",
    textWrap: "balance",
  },
  textPreset1,
]);

export const quoteSource = style([
  {
    gridArea: "source",
    marginBlockStart: space["space-0500"],
    opacity: 0.8,
    alignSelf: "end",
  },
  textPreset4,
]);
