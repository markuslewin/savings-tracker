import { space } from "@/app/styles/tokens";
import { style } from "@vanilla-extract/css";

export const depositLayout = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: space["space-0125"],
});
