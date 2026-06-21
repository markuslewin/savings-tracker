import { transition } from "@/app/styles/animation.css";
import { box } from "@/app/styles/box.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const base = style([
  box,
  sprinkles({
    borderRadius: "radius-full",
    boxSpaceBlock: "space-0150",
    boxSpaceInline: "space-0250",
    display: "inline-flex",
    alignItems: "center",
    gap: "space-0125",
    text: "5",
    textDecoration: "none",
  }),
  {
    justifyContent: "center",
    textAlign: "center",
  },
  transition,
]);

export const button = styleVariants({
  primary: [
    base,
    sprinkles({
      borderColor: "transparent",
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
      borderColor: "transparent",
      background: {
        default: "transparent",
        hover: "neutral-800",
      },
      color: "neutral-0",
    }),
  ],
  text: [
    sprinkles({
      background: "transparent",
      color: "inherit",
    }),
  ],
});

export const icon = sprinkles({
  width: "auto",
  height: "size-0250",
  flexShrink: 0,
});
