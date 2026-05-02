import { rem } from "@/app/styles/utils";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const space = {
  "spacing-0": rem(0),
  "spacing-025": rem(2),
  "spacing-050": rem(4),
  "spacing-075": rem(6),
  "spacing-100": rem(8),
  "spacing-125": rem(10),
  "spacing-150": rem(12),
  "spacing-200": rem(16),
  "spacing-250": rem(20),
  "spacing-300": rem(24),
  "spacing-400": rem(32),
  "spacing-500": rem(40),
  "spacing-600": rem(48),
  "spacing-800": rem(64),
  "spacing-1000": rem(80),
  "spacing-1200": rem(96),
  "spacing-1400": rem(112),
  "spacing-1600": rem(128),
  "spacing-1800": rem(140),
};

const radius = {
  "radius-0": rem(0),
  "radius-4": rem(4),
  "radius-6": rem(6),
  "radius-8": rem(8),
  "radius-10": rem(10),
  "radius-12": rem(12),
  "radius-16": rem(16),
  "radius-20": rem(20),
  "radius-24": rem(24),
  "radius-full": rem(999),
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    borderRadius: radius,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    placeItems: ["justifyContent", "alignItems"],
  },
});

const colors = {
  "neutral-900": "hsl(0 0% 6%)",
  "neutral-800": "hsl(0 0% 12%)",
  "neutral-700": "hsl(0 0% 19%)",
  "neutral-600": "hsl(255 4% 24%)",
  "neutral-500": "hsl(0 0% 40%)",
  "neutral-400": "hsl(210 1% 54%)",
  "neutral-300": "hsl(168 21% 93%)",
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
  properties: {
    color: colors,
    background: colors,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];
