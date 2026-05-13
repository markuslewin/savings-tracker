import { colors, radius, sprinkles } from "@/app/styles/sprinkles.css";
import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";

const borderRadius = createVar();

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
      background: colors["neutral-800"],
      color: colors["neutral-0"],
    },
  ],
  orange: [
    base,
    {
      borderColor: "hsl(0 0% 0% / 30%)",
      background: `linear-gradient(to right, ${colors["orange-700"]}, ${colors["orange-400"]})`,
      color: colors["neutral-0"],
    },
  ],
});

export const card = {
  styles,
  vars: {
    borderRadius,
  },
};
