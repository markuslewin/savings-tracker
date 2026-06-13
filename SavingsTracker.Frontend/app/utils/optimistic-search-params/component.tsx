import {
  OptimisticSearchParamsContext,
  SetSearchParams,
} from "@/app/utils/optimistic-search-params/context";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ReactNode,
  useCallback,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";

type OptimisticSearchParamsProps = {
  children: ReactNode;
};

export const OptimisticSearchParams = (props: OptimisticSearchParamsProps) => {
  // We would use `searchParams` from `page.js`, but we want to use this in `layout.js` as well and [it doesn't take `searchParams`](https://nextjs.org/docs/app/api-reference/file-conventions/layout#query-params)
  const searchParams = useSearchParams();
  const [optimisticSearchParams, setOptimisticSearchParams] =
    useOptimistic(searchParams);
  const [isPending, transition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams: SetSearchParams = useCallback(
    (value, { type }) => {
      transition(() => {
        setOptimisticSearchParams(value);
        router[type](`${pathname}?${value}` as Route, { scroll: false });
      });
    },
    [pathname, router, setOptimisticSearchParams],
  );

  const value = useMemo(() => {
    return {
      isPending,
      searchParams: optimisticSearchParams,
      setSearchParams,
    };
  }, [isPending, optimisticSearchParams, setSearchParams]);

  return <OptimisticSearchParamsContext.Provider {...props} value={value} />;
};
