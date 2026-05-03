import { transition } from "@/app/styles/animation.css";
import { size, sprinkles } from "@/app/styles/sprinkles.css";
import { textPreset5 } from "@/app/styles/text.css";
import { style, styleVariants } from "@vanilla-extract/css";

const base = style([
  sprinkles({
    borderRadius: "radius-full",
    paddingX: "space-0250",
    paddingY: "space-0150",
    display: "inline-flex",
    alignItems: "center",
    gap: "space-0125",
  }),
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

export const icon = styleVariants(size, (size) => {
  return {
    width: "auto",
    height: size,
    flexShrink: 0,
  };
});
