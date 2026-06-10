import * as center from "@/app/styles/center.css";
import { breakpoints } from "@/app/styles/media";
import { space } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { createVar, style } from "@vanilla-extract/css";

export const quoteBleed = createVar();

export const container = style([
  center.root,
  {
    paddingBlock: space["space-0500"],
    paddingInline: space["space-0200"],
    vars: {
      [center.size]: rem(640),
    },
    "@media": {
      [breakpoints.desktop]: {
        padding: space["space-0500"],
        vars: {
          [center.size]: rem(1360),
        },
      },
    },
  },
]);

export const layout = style([
  center.content,
  {
    display: "grid",
    alignItems: "center",
    "@media": {
      [breakpoints.desktop]: {
        gridTemplateColumns: `600fr 80fr 640fr ${quoteBleed}`,
        gridTemplateAreas: "'quote . form .'",
      },
    },
    vars: {
      [quoteBleed]: rem(40),
    },
  },
]);

export const quote = style({
  display: "none",
  minHeight: `min(100%, ${rem(820)})`,
  "@media": {
    [breakpoints.desktop]: {
      display: "revert",
      gridArea: "quote",
    },
  },
});

export const form = style({
  "@media": {
    [breakpoints.desktop]: {
      gridArea: "form",
    },
  },
});
