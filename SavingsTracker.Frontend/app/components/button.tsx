import { button, content, icon, spinner } from "@/app/components/button.css";
import { IconProp } from "@/app/utils/_icon";
import clsx from "clsx";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";

export type ButtonProps = AriaButtonProps & {
  variant?: keyof typeof button;
  icon?: IconProp;
};

export const Button = ({
  className,
  variant = "primary",
  icon: Icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton className={clsx(button[variant], className)} {...props}>
      <span className={content[props.isPending ? "hidden" : "visible"]}>
        <>
          {Icon === undefined ? null : <Icon className={icon} />}
          {children}
        </>
      </span>
      <ProgressCircle state={props.isPending ? "visible" : "hidden"} />
    </AriaButton>
  );
};

type ProgressCircleProps = {
  state: "visible" | "hidden";
};

// https://react-aria.adobe.com/ProgressBar#progresscircle
const ProgressCircle = ({ state }: ProgressCircleProps) => {
  // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
  const strokeWidth = 4;
  const radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <span className={spinner[state]} aria-label="pending">
      <svg fill="none" width="100%" height="100%" viewBox="0 0 32 32">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          // Normalize the path length to 100 so we can easily set stroke-dashoffset to a percentage.
          pathLength="100"
          // Add extra gap between dashes so 0% works in Chrome.
          strokeDasharray="100 200"
          strokeDashoffset={25}
          strokeLinecap="round"
          style={{
            rotate: "-90deg",
            transformOrigin: "center center",
          }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="0.75s"
            values="0;360"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </span>
  );
};
