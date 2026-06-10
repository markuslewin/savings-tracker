import { progressFill, progressTrack } from "@/app/components/progress.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import clsx from "clsx";

type ProgressProps = {
  className?: string;
  value: number;
};

// Decorative progress bar. Provide accessible values elsewhere.
export const Progress = ({ className, value }: ProgressProps) => {
  return (
    <div
      className={clsx(
        className,
        progressTrack,
        sprinkles({
          border: {
            forcedColors: "solid",
          },
          borderRadius: "radius-full",
          height: "size-0150",
          display: "grid",
          overflow: "hidden",
        }),
      )}
    >
      {value <= 0 ? null : (
        <div
          className={clsx(
            progressFill,
            sprinkles({
              border: "solid",
              borderColor: "white-alpha-30",
              borderRadius: "radius-full",
              display: "grid",
            }),
          )}
          style={{
            width: `${value * 100}%`,
          }}
        />
      )}
    </div>
  );
};
