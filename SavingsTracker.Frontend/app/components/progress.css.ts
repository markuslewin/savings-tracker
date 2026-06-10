import { colors } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import {
  createVar,
  fallbackVar,
  style,
  styleVariants,
} from "@vanilla-extract/css";

const trackColor = createVar();
const fillColor = createVar();

export const progressTrack = style([
  { background: fallbackVar(trackColor, colors["neutral-700"]) },
]);

export const progressFill = style([
  {
    backgroundColor: fillColor,
    backgroundImage: `repeating-linear-gradient(-60deg, hsl(0 0% 6% / 10%), hsl(0 0% 6% / 10%) ${rem(2)}, transparent ${rem(2)}, transparent ${rem(7.75)})`,
    backgroundOrigin: "border-box",
  },
]);

export const progressColor = styleVariants({
  orange: {
    vars: {
      [fillColor]: colors["orange-400"],
    },
  },
  white: {
    vars: {
      [trackColor]: colors["orange-800"],
      [fillColor]: colors["neutral-0"],
    },
  },
  green: {
    vars: {
      [fillColor]: colors["green-500"],
    },
  },
});
