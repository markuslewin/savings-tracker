import { sprinkles } from "@/app/styles/sprinkles.css";
import { colors, radius, size, space } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const month = style({
  display: "grid",
  gap: space["space-0200"],
});

export const header = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  textAlign: "center",
});

export const control = style({
  width: space["space-0500"],
  height: space["space-0500"],
  display: "grid",
  placeItems: "center",
  background: "transparent",
  selectors: {
    "&[data-disabled]": {
      color: colors["neutral-400"],
    },
  },
});

export const controlIcon = style({
  height: size["size-0250"],
  width: "auto",
});

export const rotate = style({
  rotate: "180deg",
});

export const grid = style([
  {
    width: "100%",
    borderSpacing: 0,
    textAlign: "center",
  },
  sprinkles({ text: "6" }),
]);

export const gridCell = style({
  width: size["size-0400"],
  height: size["size-0400"],
  borderRadius: radius["radius-full"],
  display: "inline-grid",
  placeItems: "center",
  cursor: "default",
  selectors: {
    "&[data-hovered]": {
      background: colors["neutral-600"],
    },
    "&[data-selected]": {
      background: colors["orange-400"],
      color: colors["neutral-900"],
    },
    "&[data-unavailable]": {
      textDecoration: "line-through",
    },
    "&[data-disabled]": {
      color: colors["neutral-300"],
    },
  },
});
