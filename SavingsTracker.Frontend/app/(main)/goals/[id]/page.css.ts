import { breakpoints } from "@/app/styles/media";
import { space } from "@/app/styles/sprinkles.css";
import { style } from "@vanilla-extract/css";

export const split = style({
  display: "grid",
  alignItems: "start",
  gap: space["space-0400"],
  "@media": {
    [breakpoints.tablet]: {
      gap: space["space-0600"],
    },
    [breakpoints.desktop]: {
      gridTemplateColumns: "839fr 393fr",
    },
  },
});
