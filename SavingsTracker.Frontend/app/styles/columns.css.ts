import { createVar, fallbackVar, style } from "@vanilla-extract/css";

export const number = createVar();
export const gap = createVar();

export const columns = style({
  display: "grid",
  gridTemplateColumns: `repeat(${fallbackVar(number, "1")}, minmax(0, 1fr))`,
  gap,
});
