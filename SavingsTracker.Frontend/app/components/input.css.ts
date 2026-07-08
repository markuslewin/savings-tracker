import * as fieldStyles from "@/app/styles/field.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";

const fieldPaddingInlineStart = createVar();

export const icon = style([
  fieldStyles.icon,
  sprinkles({
    marginInlineStart: "space-0200",
    alignSelf: "center",
    pointerEvents: "none",
  }),
  {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 1,
  },
]);

export const root = style([
  sprinkles({
    display: "inline-grid",
    gridTemplateColumns: "auto 1fr",
  }),
  {
    color: fieldStyles.inputColor,
    isolation: "isolate",
    selectors: {
      [`&:has(${icon})`]: {
        vars: {
          [fieldPaddingInlineStart]: rem(15 + 20 + 12),
        },
      },
    },
  },
]);

const fieldBase = style([
  {
    gridArea: "field",
    gridColumn: "1 / span 2",
    gridRow: 1,
    borderRadius: fieldStyles.borderRadius,
    paddingInline: rem(15),
    paddingBlock: rem(14),
    paddingInlineStart: fallbackVar(fieldPaddingInlineStart, rem(15)),
    background: fieldStyles.inputBackground,
    color: "inherit",
    selectors: {
      "&::placeholder": {
        color: fieldStyles.placeholderColor,
      },
    },
  },
  sprinkles({
    border: "solid",
    text: "5",
  }),
]);

export const field = styleVariants({
  idle: [
    fieldBase,
    {
      borderColor: fieldStyles.borderColor,
    },
  ],
  invalid: [
    fieldBase,
    sprinkles({
      borderColor: "red-500",
    }),
  ],
});
