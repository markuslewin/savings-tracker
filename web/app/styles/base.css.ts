import { colors } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  colorScheme: "dark",
});

globalStyle("button", {
  border: "none",
});

globalStyle(":focus-visible", {
  outline: `${rem(2)} solid ${colors["orange-400"]}`,
  outlineOffset: rem(2),
});
