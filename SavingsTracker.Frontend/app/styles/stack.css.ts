import { space as spaces } from "@/app/styles/sprinkles.css";
import { createVar, fallbackVar, StyleRule } from "@vanilla-extract/css";

export const stackSpace = createVar();

export const stack = (space: keyof typeof spaces): StyleRule => ({
  display: "grid",
  gap: fallbackVar(stackSpace, spaces[space]),
});
