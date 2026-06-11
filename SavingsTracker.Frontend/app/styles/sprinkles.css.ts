import { transition } from "@/app/styles/animation.css";
import {
  paddingBlock as cardPaddingBlock,
  paddingInline as cardPaddingInline,
} from "@/app/styles/card.css";
import {
  gap as columnsGap,
  number as columnsNumber,
} from "@/app/styles/columns.css";
import { breakpoints } from "@/app/styles/media";
import {
  border,
  colors,
  fonts,
  outline,
  outlineOffset,
  radius,
  size,
  space,
  underline,
  weights,
} from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { StyleRule } from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const mapScale = <Key extends string>(
  scale: Record<Key, string>,
  f: (value: string) => StyleRule,
) =>
  Object.fromEntries(
    Object.entries<string>(scale).map(([key, value]) => [key, f(value)]),
  ) as Record<Key, StyleRule>;

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": breakpoints.tablet },
    desktop: { "@media": breakpoints.desktop },
    forcedColors: {
      "@media": "(forced-colors: active)",
    },
    focusVisible: {
      selector: "&:focus-visible",
    },
  },
  defaultCondition: "mobile",
  properties: {
    stack: mapScale(space, (value) => ({ display: "grid", gap: value })),
    cluster: mapScale(space, (value) => ({
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: value,
    })),
    columnsNumber: mapScale(
      { "1": "1", "2": "2", "4": "4", "6": "6", "12": "12" },
      (value) => ({
        vars: { [columnsNumber]: value },
      }),
    ),
    columnsSpace: mapScale(space, (value) => ({
      vars: { [columnsGap]: value },
    })),
    cardSpaceBlock: mapScale(space, (value) => ({
      vars: { [cardPaddingBlock]: value },
    })),
    cardSpaceInline: mapScale(space, (value) => ({
      vars: { [cardPaddingInline]: value },
    })),
    text: {
      "1": {
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
      },
      "2": {
        fontFamily: fonts.inter,
        fontSize: rem(32),
        fontWeight: weights.bold,
        letterSpacing: rem(0),
        lineHeight: "120%",
      },
      "3": {
        fontFamily: fonts.inter,
        fontSize: rem(20),
        fontWeight: weights.bold,
        letterSpacing: rem(-0.3),
        lineHeight: "120%",
      },
      "4": {
        fontFamily: fonts.inter,
        fontSize: rem(20),
        fontWeight: weights.semiBold,
        letterSpacing: rem(-0.3),
        lineHeight: "120%",
      },
      "5": {
        fontFamily: fonts.inter,
        fontSize: rem(16),
        fontWeight: weights.medium,
        letterSpacing: rem(-0.3),
        lineHeight: "150%",
      },
      "5-semiBold": {
        fontFamily: fonts.inter,
        fontSize: rem(16),
        fontWeight: weights.semiBold,
        letterSpacing: rem(-0.3),
        lineHeight: "140%",
      },
      "6": {
        fontFamily: fonts.inter,
        fontSize: rem(14),
        fontWeight: weights.semiBold,
        letterSpacing: rem(-0.3),
        lineHeight: "140%",
      },
      "7": {
        fontFamily: fonts.inter,
        fontSize: rem(11),
        fontWeight: weights.semiBold,
        letterSpacing: rem(0),
        lineHeight: "120%",
      },
    },
    boxSizing: ["border-box", "content-box"],
    border: border,
    borderBlockStart: border,
    borderBottom: border,
    outline: outline,
    outlineOffset: outlineOffset,
    display: [
      "none",
      "inline-flex",
      "flex",
      "inline-grid",
      "grid",
      "inline-block",
      "block",
      "inline",
    ],
    flexDirection: ["row", "column"],
    flexWrap: ["wrap", "nowrap"],
    gridTemplateColumns: ["auto 1fr"],
    justifyContent: [
      "stretch",
      "start",
      "center",
      "end",
      "space-around",
      "space-between",
    ],
    justifySelf: ["start", "center", "end"],
    alignItems: ["stretch", "start", "center", "end"],
    alignSelf: ["stretch", "start", "center", "end"],
    flexGrow: [1],
    flexShrink: [0],
    gridColumn: ["span 2"],
    placeItems: ["center"],
    marginInline: { ...space, auto: "auto" },
    marginInlineStart: { ...space, auto: "auto" },
    marginBlockStart: { ...space, auto: "auto" },
    marginBlockEnd: { ...space, auto: "auto" },
    padding: space,
    paddingBlock: space,
    paddingBlockStart: space,
    paddingBlockEnd: space,
    paddingInline: space,
    paddingInlineStart: space,
    paddingInlineEnd: space,
    gap: space,
    width: size,
    maxWidth: {
      popover: rem(280),
      paragraph: rem(512),
      container: rem(1280),
    },
    height: size,
    borderRadius: radius,
    pointerEvents: ["none"],
    isolation: ["isolate"],
    fontWeight: ["inherit"],
    textAlign: ["center", "end"],
    textTransform: ["uppercase"],
    textDecoration: ["none"],
    line: {
      none: {
        textDecoration: "none",
      },
      underline,
    },
    overflow: ["hidden"],
    translate: {
      down: "0 1px",
    },
    transition: {
      default: transition,
    },
  },
  shorthands: {
    cardSpace: ["cardSpaceBlock", "cardSpaceInline"],
  },
});

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

// Export only `sprinkles` from this module to avoid circular dependencies in the form of:
// TypeError: Cannot read properties of undefined (reading 'neutral-700')
export const sprinkles = createSprinkles(responsiveProperties, colorProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
