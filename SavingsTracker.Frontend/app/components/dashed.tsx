import { ComponentProps } from "react";

type DashedProps = ComponentProps<"svg">;

// todo: Doesn't support `rem`s
export const DashedRect = (props: DashedProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        width="100%"
        height="100%"
        fill="none"
        rx="16"
        ry="16"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8, 8"
        strokeDashoffset="0"
        strokeLinecap="square"
      />
    </svg>
  );
};
