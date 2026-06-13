import { useOptimisticSearchParams } from "@/app/utils/optimistic-search-params/context";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useMemo } from "react";

export type DialogId = "new-goal" | "edit-goal";

const dialogKey = "dialog";

export const useDialog = ({ dialogId }: { dialogId: DialogId }) => {
  const { searchParams, setSearchParams } = useOptimisticSearchParams();

  return useMemo(() => {
    return {
      open: searchParams.get(dialogKey) === dialogId,
      close: () => {
        const next = new URLSearchParams(searchParams);
        next.delete(dialogKey);
        setSearchParams(new ReadonlyURLSearchParams(next), { type: "push" });
      },
      showModal: () => {
        const next = new URLSearchParams(searchParams);
        next.set(dialogKey, dialogId);
        setSearchParams(new ReadonlyURLSearchParams(next), { type: "push" });
      },
    };
  }, [dialogId, searchParams, setSearchParams]);
};
