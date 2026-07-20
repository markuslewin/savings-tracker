import { forcedColors } from "@/app/styles/media";
import { colors, size } from "@/app/styles/tokens";
import { keyframes, style } from "@vanilla-extract/css";

export const progressBar = style({
  position: "fixed",
  top: 0,
  insetInline: 0,
  height: size["size-0050"],
  display: "grid",
  overflow: "hidden",
  pointerEvents: "none",
  "@media": {
    [forcedColors]: {
      background: "Canvas",
    },
  },
});

const slide = keyframes({
  "0%": {
    transform: "translateX(-100%)",
  },
  "100%": {
    transform: "translateX(100%)",
  },
});

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

export const indicator = style({
  display: "grid",
  animation: `
      2s linear infinite ${slide},
      100ms 150ms both ${fadeIn}
    `,
  selectors: {
    "&::before": {
      content: '""',
      width: "75%",
      background: colors["orange-400"],
      "@media": {
        [forcedColors]: {
          background: "CanvasText",
        },
      },
    },
  },
});
