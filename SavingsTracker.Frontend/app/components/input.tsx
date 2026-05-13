import { field, icon, root } from "@/app/components/input.css";
import { ComponentProps, FC, SVGProps } from "react";

type RootProps = ComponentProps<"span">;

export const Root = (props: RootProps) => {
  return <span className={root} {...props} />;
};

type InputProps = ComponentProps<"input">;

export const Field = (props: InputProps) => {
  return <input className={field} {...props} />;
};

type IconProps = ComponentProps<"svg"> & {
  icon: FC<SVGProps<SVGElement>>;
};

export const Icon = ({ icon: Icon, ...props }: IconProps) => {
  return <Icon className={icon} {...props} />;
};
