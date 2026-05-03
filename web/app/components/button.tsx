import { icon, variants } from "@/app/components/button.css";
import { ComponentProps, FC, SVGProps } from "react";

type RootProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
};

export const Root = ({ variant = "primary", ...props }: RootProps) => {
  return <button className={variants[variant]} {...props} />;
};

type IconProps = ComponentProps<"svg"> & {
  icon: FC<SVGProps<SVGElement>>;
};

export const Icon = ({ icon: Icon, ...props }: IconProps) => {
  return <Icon className={icon} {...props} />;
};
