import { useMemo } from "react";
import { useMatches } from "remix";

export const useRouteLoaderData = <TData>(index: number): TData => {
  const matches = useMatches();

  return useMemo(() => {
    const loaderMatches = matches.filter((match) => match.data);
    const result = loaderMatches[index];

    return result.data as TData;
  }, [index, matches]);
};
