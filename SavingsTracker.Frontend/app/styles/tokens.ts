import { rem } from "@/app/styles/utils";

export const fonts = {
  bricolageGrotesque: "var(--font-bricolage-grotesque)",
  inter: "var(--font-inter)",
} as const;

export type FontVariable =
  (typeof fonts)[keyof typeof fonts] extends `var(${infer Variable})`
    ? Variable
    : never;

export const weights = {
  medium: 500,
  semiBold: 600,
  bold: 700,
};

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

export const border = {
  solid: `${rem(1)} solid transparent`,
  dashed: `${rem(1)} dashed transparent`,
};

export const outline = {
  none: "none",
  default: `${rem(2)} solid ${colors["orange-400"]}`,
  4: `${rem(4)} solid ${colors["orange-400"]}`,
};
export const outlineOffset = {
  default: rem(2),
  4: rem(4),
};

export const underline = {
  textDecoration: "underline",
  textUnderlineOffset: rem(3),
};
