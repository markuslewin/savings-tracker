import { ReactNode } from "react";

export type IconProp = ({
  className,
}: {
  className: string;
}) => ReactNode | Promise<ReactNode>;
