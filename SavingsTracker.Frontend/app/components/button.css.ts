import { transition } from "@/app/styles/animation.css";
import { box } from "@/app/styles/box.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { ComplexStyleRule, style, styleVariants } from "@vanilla-extract/css";

const area = "stack";

export const base = style([
  box,
  sprinkles({
    borderRadius: "radius-full",
    boxSpaceBlock: "space-0150",
    boxSpaceInline: "space-0250",
    display: "inline-grid",
    text: "5",
    textDecoration: "none",
  }),
  {
    gridTemplateAreas: `"${area}"`,
    placeItems: "center",
  },
  transition,
]);

export const button = styleVariants({
  primary: [
    base,
    sprinkles({
      borderColor: "transparent",
      background: {
        default: "orange-400",
        hover: "orange-500",
      },
      color: "neutral-900",
    }),
  ],
  secondary: [
    base,
    sprinkles({
      borderColor: "neutral-600",
      background: {
        default: "neutral-800",
        hover: "neutral-900",
      },
      color: "neutral-0",
    }),
  ],
  tertiary: [
    base,
    sprinkles({
      borderColor: "transparent",
      background: {
        default: "transparent",
        hover: "neutral-800",
      },
      color: "neutral-0",
    }),
  ],
});

const contentBase: ComplexStyleRule = [
  sprinkles({
    display: "flex",
    alignItems: "center",
    gap: "space-0125",
  }),
  {
    gridArea: area,
    justifyContent: "center",
    textAlign: "center",
  },
];

export const content = styleVariants({
  visible: [...contentBase],
  hidden: [...contentBase, { opacity: 0 }],
});

export const icon = sprinkles({
  width: "auto",
  height: "size-0250",
  flexShrink: 0,
});

const spinnerBase: ComplexStyleRule = [
  sprinkles({ display: "block", width: "size-0200", height: "size-0200" }),
  {
    gridArea: area,
  },
];

export const spinner = styleVariants({
  visible: [...spinnerBase],
  hidden: [...spinnerBase, { visibility: "hidden" }],
});
