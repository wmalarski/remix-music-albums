import { Transition } from "@remix-run/react/transition";
import { useMemo } from "react";
import {
  json as remixJson,
  useFormAction,
  useMatches,
  useTransition,
} from "remix";
import { RouteKind } from "./routes";

export type HandleFunctionReturn = {
  route: RouteKind;
};

export type HandleFunction = () => HandleFunctionReturn;

export const json = <TData>(
  data: TData,
  init?: Parameters<typeof remixJson>[1]
): ReturnType<typeof remixJson> => remixJson(data, init);

export const useRouteTransition = (): Transition => {
  const transition = useTransition();
  const currentAction = useFormAction();
  return transition.submission?.action === currentAction
    ? transition
    : {
        state: "idle",
        type: "idle",
        submission: undefined,
        location: undefined,
      };
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
