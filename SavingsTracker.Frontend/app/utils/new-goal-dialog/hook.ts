import { useOptimisticSearchParams } from "@/app/utils/optimistic-search-params/context";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useMemo } from "react";

const dialogKey = "new";

export const useNewGoalDialog = () => {
  const { searchParams, setSearchParams } = useOptimisticSearchParams();

  return useMemo(() => {
    return {
      open: searchParams.has(dialogKey),
      close: () => {
        const next = new URLSearchParams(searchParams);
        next.delete(dialogKey);
        setSearchParams(new ReadonlyURLSearchParams(next), { type: "push" });
      },
      showModal: () => {
        const next = new URLSearchParams(searchParams);
        next.set(dialogKey, "");
        setSearchParams(new ReadonlyURLSearchParams(next), { type: "push" });
      },
    };
  }, [searchParams, setSearchParams]);
};
