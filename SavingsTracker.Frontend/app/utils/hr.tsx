import { Sprinkles, sprinkles } from "@/app/styles/sprinkles.css";

type HrProps = { color: Sprinkles["color"] };

// Decorative `<hr />`
export const Hr = ({ color }: HrProps) => {
  return (
    <div
      className={sprinkles({
        borderBottom: "solid",
        borderColor: color,
      })}
    />
  );
};
