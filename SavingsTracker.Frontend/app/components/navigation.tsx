// https://github.com/vercel/react-transition-progress/tree/main

"use client";

import { indicator, progressBar } from "@/app/components/navigation.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { Route } from "next";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  startTransition,
  useContext,
  useOptimistic,
} from "react";

const ProgressContext = createContext<{
  isLoading: boolean;
  start: () => void;
} | null>(null);

type ProgressProps = {
  children: ReactNode;
};

export const ProgressBarProvider = (props: ProgressProps) => {
  const [isLoading, setIsLoading] = useOptimistic(false);

  return (
    <ProgressContext.Provider
      value={{
        isLoading,
        start: () => {
          setIsLoading(true);
        },
      }}
      {...props}
    />
  );
};

const useProgress = () => {
  const value = useContext(ProgressContext);
  if (value === null) {
    throw new Error("`useProgress` must be used inside of `ProgressContext`");
  }
  return value;
};

export const ProgressBar = () => {
  const { isLoading } = useProgress();

  return (
    <div className={progressBar} role="status">
      {isLoading ? (
        <>
          <div className={indicator} />
          <span className={srOnly}>Loading</span>
        </>
      ) : null}
    </div>
  );
};

export type LinkProps<RouteInferType extends string> = Omit<
  NextLinkProps<RouteInferType>,
  "href"
> & {
  href: Route<RouteInferType>;
};

export const Link = <RouteType extends string>(props: LinkProps<RouteType>) => {
  const router = useRouter();
  const { start } = useProgress();

  return (
    <NextLink
      {...props}
      onNavigate={() => {
        startTransition(() => {
          start();
          if (props.replace) {
            router.replace(props.href, { scroll: props.scroll });
          } else {
            router.push(props.href, { scroll: props.scroll });
          }
        });
      }}
    />
  );
};
