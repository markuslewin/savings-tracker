import {
  form as layoutForm,
  quote as layoutQuote,
  quoteBleed,
} from "@/app/(auth)/layout.css";
import { card } from "@/app/styles/card.css";
import { breakpoints } from "@/app/styles/media";
import { colors, space } from "@/app/styles/sprinkles.css";
import { stack } from "@/app/styles/stack.css";
import { textPreset1, textPreset2, textPreset4 } from "@/app/styles/text.css";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const article = style([layoutForm, stack("space-0400")]);

export const intro = style([stack("space-0200")]);

export const heading = style([textPreset2]);

export const paragraph = style({
  color: colors["neutral-300"],
});

export const form = style([stack("space-0250")]);

export const submit = style({
  marginBlockStart: space["space-0150"],
});

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
