import { card } from "@/app/styles/card.css";
import { breakpoints } from "@/app/styles/media";
import { colors, size, space } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const overlay = style([
  {
    position: "fixed",
    inset: 0,
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: `minmax(auto, ${rem(680)})`,
    justifyContent: "center",
    alignItems: "center",
    background: colors["neutral-900-alpha-90"],
  },
]);

export const modal = style([
  card.styles.grey,
  {
    paddingBlock: rem(19),
    paddingInline: rem(15),
    "@media": {
      [breakpoints.tablet]: {
        padding: rem(31),
      },
    },
  },
]);

export const header = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: space["space-0200"],
});

export const close = style({
  background: "transparent",
  color: colors["neutral-400"],
});

export const closeIcon = style({
  width: size["size-0250"],
  height: size["size-0250"],
});
