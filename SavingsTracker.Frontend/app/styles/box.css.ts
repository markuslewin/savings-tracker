import { rem } from "@/app/styles/utils";
import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

const borderWidth = rem(1);

export const paddingBlock = createVar();
export const paddingInline = createVar();

export const box = style({
  border: `${borderWidth} solid`,
  paddingBlock: calc.subtract(paddingBlock, borderWidth),
  paddingInline: calc.subtract(paddingInline, borderWidth),
});
