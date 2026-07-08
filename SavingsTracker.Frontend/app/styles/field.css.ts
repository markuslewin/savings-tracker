import { box } from "@/app/styles/box.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { colors, radius, space } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const gap = space["space-0150"];
export const borderColor = colors["neutral-500"];
export const borderRadius = radius["radius-08"];
export const inputBackground = colors["neutral-700"];
export const inputColor = colors["neutral-0"];
export const placeholderColor = colors["neutral-300"];

export const field = sprinkles({
  stack: "space-0125",
});

export const label = sprinkles({ text: "5" });

export const input = style([
  box,
  sprinkles({
    boxSpaceBlock: "space-0",
    boxSpaceInline: "space-0200",
    text: "5",
  }),
  {
    height: rem(54),
    borderRadius,
    borderColor,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    background: inputBackground,
    color: inputColor,
  },
]);

export const icon = sprinkles({
  width: "auto",
  height: "size-0250",
});
