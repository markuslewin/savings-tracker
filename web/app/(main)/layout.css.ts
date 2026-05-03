import { breakpoints } from "@/app/styles/media";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { style } from "@vanilla-extract/css";

export const header = style([
  sprinkles({
    borderBottom: "0.0625rem solid transparent",
    borderColor: "neutral-800",
  }),
  {
    paddingBlockStart: rem(12),
    paddingBlockEnd: rem(11),
    "@media": {
      [breakpoints.tablet]: {
        paddingBlockStart: rem(16),
        paddingBlockEnd: rem(15),
      },
    },
  },
]);

export const container = style([
  sprinkles({
    boxSizing: "content-box",
    maxWidth: "container",
    marginInline: "auto",
    paddingInline: {
      mobile: "space-0200",
      tablet: "space-0300",
    },
  }),
]);
