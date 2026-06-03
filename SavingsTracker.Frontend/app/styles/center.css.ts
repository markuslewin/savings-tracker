import { createVar, style } from "@vanilla-extract/css";

export const size = createVar();

export const root = style({
  display: "grid",
  gridTemplateAreas: "'. content .'",
  gridTemplateColumns: `1fr minmax(0, ${size}) 1fr`,
});

export const content = style({
  gridArea: "content",
});
