import { colors, sprinkles } from "@/app/styles/sprinkles.css";

type HrProps = { color: keyof typeof colors };

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
