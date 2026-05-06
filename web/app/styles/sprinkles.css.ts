import { breakpoints } from "@/app/styles/media";
import { rem } from "@/app/styles/utils";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

export const space = {
  "space-0": rem(0),
  "space-0025": rem(2),
  "space-0050": rem(4),
  "space-0075": rem(6),
  "space-0100": rem(8),
  "space-0125": rem(10),
  "space-0150": rem(12),
  "space-0200": rem(16),
  "space-0250": rem(20),
  "space-0300": rem(24),
  "space-0400": rem(32),
  "space-0500": rem(40),
  "space-0600": rem(48),
  "space-0800": rem(64),
  "space-1000": rem(80),
  "space-1200": rem(96),
  "space-1400": rem(112),
  "space-1600": rem(128),
  "space-1800": rem(140),
};

export const size = {
  "size-0": rem(0),
  "size-0025": rem(2),
  "size-0050": rem(4),
  "size-0075": rem(6),
  "size-0100": rem(8),
  "size-0125": rem(10),
  "size-0150": rem(12),
  "size-0200": rem(16),
  "size-0250": rem(20),
  "size-0300": rem(24),
  "size-0400": rem(32),
  "size-0500": rem(40),
  "size-0600": rem(48),
  "size-0800": rem(64),
  "size-1000": rem(80),
  "size-1200": rem(96),
  "size-1400": rem(112),
  "size-1600": rem(128),
  "size-1800": rem(140),
  auto: "auto",
  full: "100%",
};

const radius = {
  "radius-00": rem(0),
  "radius-04": rem(4),
  "radius-06": rem(6),
  "radius-08": rem(8),
  "radius-10": rem(10),
  "radius-12": rem(12),
  "radius-16": rem(16),
  "radius-20": rem(20),
  "radius-24": rem(24),
  "radius-full": rem(999),
};

const border = {
  default: `${rem(1)} solid transparent`,
  dashed: `${rem(1)} dashed transparent`,
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": breakpoints.tablet },
    desktop: { "@media": breakpoints.desktop },
    forcedColors: {
      "@media": "(forced-colors: active)",
    },
  },
  defaultCondition: "mobile",
  properties: {
    boxSizing: ["border-box", "content-box"],
    border: border,
    borderBottom: border,
    display: [
      "none",
      "inline-flex",
      "flex",
      "inline-grid",
      "grid",
      "block",
      "inline",
    ],
    flexDirection: ["row", "column"],
    flexWrap: ["wrap", "nowrap"],
    gridTemplateColumns: ["auto 1fr"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "start", "center", "end"],
    alignSelf: ["stretch", "start", "center", "end"],
    flexGrow: [1],
    flexShrink: [0],
    gridColumn: ["span 2"],
    marginInline: { ...space, auto: "auto" },
    marginInlineStart: space,
    marginBlockStart: space,
    paddingBlock: space,
    paddingBlockStart: space,
    paddingBlockEnd: space,
    paddingInline: space,
    paddingInlineStart: space,
    paddingInlineEnd: space,
    gap: space,
    width: size,
    maxWidth: { paragraph: rem(512), container: rem(1280) },
    height: size,
    borderRadius: radius,
    pointerEvents: ["none"],
    textAlign: ["center"],
    overflow: ["hidden"],
  },
});

export const colors = {
  transparent: "transparent",
  inherit: "inherit",
  "white-alpha-30": "hsl(0 100% 100% / 30%)",
  "neutral-900": "hsl(0 0% 6%)",
  "neutral-800": "hsl(0 0% 12%)",
  "neutral-700": "hsl(0 0% 19%)",
  "neutral-600": "hsl(255 4% 24%)",
  "neutral-500": "hsl(0 0% 40%)",
  "neutral-400": "hsl(210 1% 54%)",
  // Error in design system
  // "neutral-300": "hsl(168 21% 93%)",
  "neutral-300": "hsl(0 0% 72%)",
  "neutral-0": "hsl(0 0% 100%)",
  "orange-400": "hsl(14 100% 57%)",
  "orange-500": "hsl(15 89% 49%)",
  "orange-700": "hsl(13 91% 38%)",
  "orange-800": "hsl(15 76% 32%)",
  "green-500": "hsl(142 69% 58%)",
  "green-900": "hsl(148 40% 17%)",
  "red-500": "hsl(0 83% 60%)",
};

const colorProperties = defineProperties({
  conditions: {
    default: {},
    hover: {
      "@media": "(hover: hover)",
      selector: "&:hover",
    },
    placeholder: {
      selector: "&:placeholder",
    },
  },
  defaultCondition: "default",
  properties: {
    borderColor: colors,
    color: colors,
    background: colors,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
