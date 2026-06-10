import { breakpoints } from "@/app/styles/media";
import { rem } from "@/app/styles/utils";
import { style, StyleRule } from "@vanilla-extract/css";

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

export const textPreset1Base: StyleRule = {
  fontFamily: fonts.bricolageGrotesque,
  fontSize: rem(44),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-2),
  lineHeight: "100%",
  "@media": {
    [breakpoints.tablet]: {
      fontSize: rem(64),
    },
  },
};

export const textPreset1 = style(textPreset1Base);

export const textPreset2 = style({
  fontFamily: fonts.inter,
  fontSize: rem(32),
  fontWeight: weights.bold,
  letterSpacing: rem(0),
  lineHeight: "120%",
});

export const textPreset3 = style({
  fontFamily: fonts.inter,
  fontSize: rem(20),
  fontWeight: weights.bold,
  letterSpacing: rem(-0.3),
  lineHeight: "120%",
});

export const textPreset4Base = {
  fontFamily: fonts.inter,
  fontSize: rem(20),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-0.3),
  lineHeight: "120%",
};

export const textPreset4 = style(textPreset4Base);

export const textPreset5 = style({
  fontFamily: fonts.inter,
  fontSize: rem(16),
  fontWeight: weights.medium,
  letterSpacing: rem(-0.3),
  lineHeight: "150%",
});

export const textPreset5SemiBold = style({
  fontFamily: fonts.inter,
  fontSize: rem(16),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-0.3),
  lineHeight: "140%",
});

export const textPreset6Base: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(14),
  fontWeight: weights.semiBold,
  letterSpacing: rem(-0.3),
  lineHeight: "140%",
};

export const textPreset6 = style(textPreset6Base);

export const textPreset7Base: StyleRule = {
  fontFamily: fonts.inter,
  fontSize: rem(11),
  fontWeight: weights.semiBold,
  letterSpacing: rem(0),
  lineHeight: "120%",
};

export const textPreset7 = style(textPreset7Base);
