import { box } from "@/app/styles/box.css";
import { colors, radius } from "@/app/styles/tokens";
import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const borderRadius = createVar();
export const borderColor = createVar();
export const shapeLayer = createVar();

const base = style([
  box,
  {
    borderRadius: fallbackVar(borderRadius, radius["radius-16"]),
  },
]);

export const card = styleVariants({
  grey: [
    base,
    {
      borderColor: fallbackVar(borderColor, colors["neutral-600"]),
      background: `${fallbackVar(shapeLayer, "none")}, ${colors["neutral-800"]}`,
      color: colors["neutral-0"],
    },
  ],
  orange: [
    base,
    {
      borderColor: "hsl(0 0% 0% / 30%)",
      background: `${fallbackVar(shapeLayer, "none")}, linear-gradient(to right, ${colors["orange-700"]}, ${colors["orange-400"]})`,
      color: colors["neutral-0"],
    },
  ],
});
