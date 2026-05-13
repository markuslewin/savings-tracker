import { sprinkles } from "@/app/styles/sprinkles.css";
import { textPreset5 } from "@/app/styles/text.css";
import { rem } from "@/app/styles/utils";
import { createVar, fallbackVar, style } from "@vanilla-extract/css";

const fieldPaddingInlineStart = createVar();

export const icon = style([
  sprinkles({
    marginInlineStart: "space-0200",
    alignSelf: "center",
    width: "auto",
    height: "size-0250",
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
    color: "neutral-0",
  }),
  {
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

export const field = style([
  {
    gridArea: "field",
    gridColumn: "1 / span 2",
    gridRow: 1,
    paddingInline: rem(15),
    paddingBlock: rem(14),
    paddingInlineStart: fallbackVar(fieldPaddingInlineStart, rem(15)),
  },
  sprinkles({
    border: "solid",
    borderColor: "neutral-500",
    borderRadius: "radius-08",
    background: "neutral-700",
    color: {
      default: "inherit",
      placeholder: "neutral-300",
    },
  }),
  textPreset5,
]);
