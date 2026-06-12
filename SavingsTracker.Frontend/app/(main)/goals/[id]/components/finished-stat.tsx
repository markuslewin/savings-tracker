import { sprinkles } from "@/app/styles/sprinkles.css";
import { ReactNode } from "react";

type FinishedStatProps = {
  term: string;
  data: ReactNode;
};

export const FinishedStat = ({ term, data }: FinishedStatProps) => {
  return (
    <div
      className={sprinkles({
        display: "flex",
        flexDirection: "column-reverse",
        gap: "space-0100",
        textTransform: "uppercase",
      })}
    >
      <dt>{term}</dt>
      <dd
        className={sprinkles({
          text: "2",
        })}
      >
        {data}
      </dd>
    </div>
  );
};
