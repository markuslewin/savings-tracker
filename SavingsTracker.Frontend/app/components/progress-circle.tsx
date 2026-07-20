import { progressCircle } from "@/app/components/progress-circle.css";
import clsx from "clsx";

type ProgressCircleProps = {
  className?: string;
  state: "visible" | "hidden";
};

// https://react-aria.adobe.com/ProgressBar#progresscircle
export const ProgressCircle = ({ className, state }: ProgressCircleProps) => {
  // SVG strokes are centered, so subtract half the stroke width from the radius to create an inner stroke.
  const strokeWidth = 4;
  const radius = `calc(50% - ${strokeWidth / 2}px)`;

  return (
    <span
      className={clsx(className, progressCircle[state])}
      aria-label="pending"
    >
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
