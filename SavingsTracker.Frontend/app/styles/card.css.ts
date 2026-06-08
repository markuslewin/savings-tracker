import { colors, radius } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const borderWidth = rem(1);

const borderRadius = createVar();
const padding = createVar();
const shapeLayer = createVar();

const base = style([
  {
    borderStyle: "solid",
    borderRadius: fallbackVar(borderRadius, radius["radius-16"]),
    borderWidth,
    padding: calc.subtract(padding, borderWidth),
  },
]);

export const styles = styleVariants({
  grey: [
    base,
    {
      borderColor: colors["neutral-600"],
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

export const card = {
  styles,
  vars: {
    borderRadius,
    padding,
    shapeLayer,
  },
};
