import { rem } from "@/app/styles/utils";
import { StyleRule } from "@vanilla-extract/css";

const fonts = {
  bricolageGrotesque: "var(--font-bricolage-grotesque)",
  inter: "var(--font-inter)",
} as const;

export type FontVariable =
  (typeof fonts)[keyof typeof fonts] extends `var(${infer Variable})`
    ? Variable
    : never;

const weights = {
  medium: 500,
  semiBold: 600,
  bold: 700,
};

export const textPreset1: StyleRule = {
  fontFamily: fonts.bricolageGrotesque,
  fontSize: rem(44),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-2),
  lineHeight: "100%",
  "@media": {
    "(min-width: 40em)": {
      fontSize: rem(64),
    },
  },
};

export const textPreset2: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(32),
  fontWeight: weights.bold,
  letterSpacing: rem(0),
  lineHeight: "120%",
};

export const textPreset3: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(20),
  fontWeight: weights.bold,
  letterSpacing: rem(-0.3),
  lineHeight: "120%",
};

export const textPreset4: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(20),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-0.3),
  lineHeight: "120%",
};

export const textPreset5: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(16),
  fontWeight: weights.medium,
  letterSpacing: rem(-0.3),
  lineHeight: "150%",
};

export const textPreset5SemiBold: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(16),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-0.3),
  lineHeight: "140%",
};

export const textPreset6: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(14),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-0.3),
  lineHeight: "140%",
};

export const textPreset7: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(11),
  fontWeight: weights.semiBold,
  letterSpacing: rem(0),
  lineHeight: "120%",
};
