import { sprinkles } from "@/app/styles/sprinkles.css";
import { ComplexStyleRule, styleVariants } from "@vanilla-extract/css";

const progressCircleBase: ComplexStyleRule = [
  sprinkles({ display: "block", width: "size-0200", height: "size-0200" }),
];

export const progressCircle = styleVariants({
  visible: [...progressCircleBase],
  hidden: [...progressCircleBase, { visibility: "hidden" }],
});
