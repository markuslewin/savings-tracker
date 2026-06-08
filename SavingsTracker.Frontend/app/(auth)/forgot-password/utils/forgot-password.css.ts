import { colors } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const paragraph = style({
  maxInlineSize: rem(300),
  color: colors["neutral-300"],
});
