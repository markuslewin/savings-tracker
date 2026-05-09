import { createVar, style } from "@vanilla-extract/css";

const sizeVar = createVar();
const colorVar = createVar();

const styles = style({
  borderTop: `${sizeVar} solid`,
  borderColor: colorVar,
  width: sizeVar,
  height: sizeVar,
  borderRadius: 9999,
});

export const circle = {
  styles,
  sizeVar,
  colorVar,
};
