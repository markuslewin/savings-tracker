import { User } from "@/app/utils/api";
import { useOptimisticSearchParams } from "@/app/utils/optimistic-search-params/context";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export type DialogId = "new-goal" | "edit-goal";

const dialogKey = "dialog";

export const useDialog = ({
  dialogId,
  user,
}: {
  dialogId: DialogId;
  user: User | null;
}) => {
  const router = useRouter();
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
        // In this app, users must be signed in to open dialogs
        if (user === null) {
          router.push("/signin");
          return;
        }
        const next = new URLSearchParams(searchParams);
        next.set(dialogKey, dialogId);
        setSearchParams(new ReadonlyURLSearchParams(next), { type: "push" });
      },
    };
  }, [dialogId, router, searchParams, setSearchParams, user]);
};
