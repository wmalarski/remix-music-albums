import { Transition } from "@remix-run/react/transition";
import { useMemo } from "react";
import { json as remixJson, useMatches, useTransition } from "remix";
import { RouteKind } from "./routes";

export type HandleFunctionReturn = {
  route: RouteKind;
};

export type HandleFunction = () => HandleFunctionReturn;

export const json = <TData>(
  data: TData,
  init?: Parameters<typeof remixJson>[1]
): ReturnType<typeof remixJson> => remixJson(data, init);

export const useCurrentTransition = (): Transition => {
  const transition = useTransition();
  // const location = useLocation();
  // const resolved = useResolvedPath(location.pathname);

  // console.log({ transition, location, resolved });

  return useMemo(() => {
    return transition;
  }, [transition]);
};

export const useRouteLoaderData = <TData>(route: RouteKind): TData => {
  const matches = useMatches();

  return useMemo(() => {
    const result = matches.find((match) => {
      const handle: HandleFunctionReturn | undefined = match.handle?.();
      return handle?.route === route;
    });

    return result?.data as TData;
  }, [route, matches]);
};
