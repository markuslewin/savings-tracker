import { outline } from "@/app/styles/sprinkles.css";
import { rem } from "@/app/styles/utils";
import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  colorScheme: "dark",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
});

globalStyle("p", {
  margin: 0,
});

globalStyle("dd", {
  margin: 0,
});

globalStyle("button", {
  border: "none",
  padding: 0,
});

globalStyle("ul, ol", {
  margin: 0,
  padding: 0,
});

globalStyle(":focus-visible", {
  outline: outline.default,
  outlineOffset: rem(2),
});
