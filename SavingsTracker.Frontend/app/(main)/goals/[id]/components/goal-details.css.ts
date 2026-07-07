import { colors, space } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const depositLayout = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: space["space-0125"],
});

const light = "hsl(40 100% 93%)";
const color = "hsl(12 57% 57%)";

export const glassCircle = style({
  background: `linear-gradient(-45deg, ${light}, ${color}, ${color}, ${light})`,
});

export const glassCircleInner = style({
  borderRadius: "inherit",
  display: "grid",
  placeItems: "center",
  background: color,
  color: colors["neutral-0"],
});
