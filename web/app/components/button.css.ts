import { transition } from "@/app/styles/animation.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { textPreset5 } from "@/app/styles/text.css";
import { rem } from "@/app/styles/utils";
import { style, styleVariants } from "@vanilla-extract/css";

const base = style([
  sprinkles({
    border: "solid",
    borderRadius: "radius-full",
    display: "inline-flex",
    alignItems: "center",
    gap: "space-0125",
  }),
  {
    paddingInline: rem(19),
    paddingBlock: rem(11),
  },
  textPreset5,
  transition,
]);

export const variants = styleVariants({
  primary: [
    base,
    sprinkles({
      background: {
        default: "orange-400",
        hover: "orange-500",
      },
      color: "neutral-900",
    }),
  ],
  secondary: [
    base,
    sprinkles({
      borderColor: "neutral-600",
      background: {
        default: "neutral-800",
        hover: "neutral-900",
      },
      color: "neutral-0",
    }),
  ],
  tertiary: [
    base,
    sprinkles({
      background: {
        default: "transparent",
        hover: "neutral-800",
      },
      color: "neutral-0",
    }),
  ],
});

export const icon = sprinkles({
  width: "auto",
  height: "size-0250",
  flexShrink: 0,
});
