import { sprinkles } from "@/app/styles/sprinkles.css";
import { space } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const intro = style([sprinkles({ stack: "space-0200" })]);

export const heading = style([sprinkles({ text: "2" })]);

export const paragraph = style([
  sprinkles({
    color: "neutral-300",
  }),
]);

export const form = style([sprinkles({ stack: "space-0250" })]);

export const submit = style({
  marginBlockStart: space["space-0150"],
});
