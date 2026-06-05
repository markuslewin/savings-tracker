import { colors, radius, sprinkles } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const borderRadius = createVar();
const shapeLayer = createVar();

const base = style([
  sprinkles({
    border: "solid",
  }),
  {
    borderRadius: fallbackVar(borderRadius, radius["radius-16"]),
  },
]);

const styles = styleVariants({
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
    shapeLayer,
  },
};

export const fromCenter = (x: number, y: number) => {
  return `${calc.add("50%", rem(x))} ${calc.add("50%", rem(y))}`;
};
