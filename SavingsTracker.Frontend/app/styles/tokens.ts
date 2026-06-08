import { rem } from "@/app/styles/utils";

// todo: Fix duplication in tokens/sprinkles

export const colors = {
  transparent: "transparent",
  inherit: "inherit",
  "white-alpha-30": "hsl(0 100% 100% / 30%)",
  "white-alpha-70": "hsl(0 100% 100% / 70%)",
  "neutral-900-alpha-90": "hsl(0 0% 6% / 90%)",
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

export const radius = {
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
