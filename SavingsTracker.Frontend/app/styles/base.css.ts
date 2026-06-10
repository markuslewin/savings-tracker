import { outline, underline } from "@/app/styles/tokens";
import { rem } from "@/app/styles/utils";
import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  colorScheme: "dark",
});

globalStyle("body", {
  margin: 0,
  display: "grid",
});

globalStyle("blockquote", {
  margin: 0,
});

globalStyle("figure", {
  margin: 0,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
  fontSize: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
});

globalStyle("p", {
  margin: 0,
});

globalStyle("dd", {
  margin: 0,
});

globalStyle("dl", {
  margin: 0,
});

globalStyle("button", {
  border: "none",
  padding: 0,
});

globalStyle("a", {
  color: "inherit",
  ...underline,
});

globalStyle("ul, ol", {
  margin: 0,
  padding: 0,
});

globalStyle(":focus-visible", {
  outline: outline.default,
  outlineOffset: rem(2),
});
