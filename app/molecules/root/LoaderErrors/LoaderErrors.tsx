import { ReactElement, useMemo } from "react";
import { useMatches } from "remix";
import { FetcherError } from "~/api/fetcher";
import { ErrorsList } from "~/components";

export const LoaderErrors = (): ReactElement => {
  const matches = useMatches();

  const errors = useMemo<FetcherError[]>(
    () => matches.flatMap((match) => match.data?.errors ?? []),
    [matches]
  );

  return <ErrorsList errors={errors} />;
};
