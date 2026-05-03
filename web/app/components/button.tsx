import { variants } from "@/app/components/button.css";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
};

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return <button className={variants[variant]} {...props} />;
};
