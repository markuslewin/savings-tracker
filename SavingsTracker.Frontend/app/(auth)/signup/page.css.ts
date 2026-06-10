import { space } from "@/app/styles/sprinkles.css";
import { stack } from "@/app/styles/stack.css";
import { textPreset2 } from "@/app/styles/text.css";
import { colors } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const intro = style([stack("space-0200")]);

export const heading = style([textPreset2]);

export const paragraph = style({
  color: colors["neutral-300"],
});

export const form = style([stack("space-0250")]);

export const submit = style({
  marginBlockStart: space["space-0150"],
});
