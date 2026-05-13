"use client";

import { ReadonlyURLSearchParams } from "next/navigation";
import { createContext, useContext } from "react";

export type SetSearchParams = (
  value: ReadonlyURLSearchParams,
  options: { type: "push" | "replace" },
) => void;

export const OptimisticSearchParamsContext = createContext<{
  isPending: boolean;
  searchParams: ReadonlyURLSearchParams;
  setSearchParams: SetSearchParams;
} | null>(null);

export const useOptimisticSearchParams = () => {
  const value = useContext(OptimisticSearchParamsContext);
  if (value === null) {
    throw new Error(
      "`useOptimisticSearchParams` must be used inside `OptimisticSearchParams`",
    );
  }

  return value;
};
