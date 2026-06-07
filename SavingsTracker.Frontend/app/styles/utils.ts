import { calc } from "@vanilla-extract/css-utils";

export const rem = (px: number) => {
  return `${px / 16}rem`;
};

export const fromCenter = (x: number, y: number) => {
  return `${calc.add("50%", rem(x))} ${calc.add("50%", rem(y))}`;
};
