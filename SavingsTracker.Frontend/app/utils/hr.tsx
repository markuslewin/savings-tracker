import { sprinkles } from "@/app/styles/sprinkles.css";
import { colors } from "@/app/styles/tokens";

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
