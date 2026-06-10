import ChevronLeftIcon from "@/app/icons/icon-chevron-left.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type BackProps<RouteInferType> = {
  to: LinkProps<RouteInferType>["href"];
  children: ReactNode;
};

export const Back = <RouteType,>({ to, children }: BackProps<RouteType>) => {
  return (
    <Link
      className={sprinkles({
        justifySelf: "start",
        display: "inline-flex",
        gap: "space-0075",
        alignItems: "center",
        textDecoration: "none",
        color: { default: "neutral-300", hover: "neutral-0" },
        transition: "default",
      })}
      href={to}
    >
      <ChevronLeftIcon
        className={sprinkles({
          width: "auto",
          height: "size-0250",
        })}
      />
      {children}
    </Link>
  );
};
