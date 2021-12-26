import { Transition } from "@remix-run/react/transition";
import {
  FormMethod,
  json as remixJson,
  useFormAction,
  useTransition,
} from "remix";
import { FetcherActionData } from "~/services/fetcher.server";

export const json = <TData>(
  data: TData,
  init?: Parameters<typeof remixJson>[1]
): ReturnType<typeof remixJson> => remixJson(data, init);

export const notFound = (): Response => {
  return new Response("Not Found", { status: 404 });
};

export const notAuthorized = (): ReturnType<typeof remixJson> => {
  return json<FetcherActionData>({
    fetcherErrors: [{ message: "No rights to modify" }],
  });
};

export const useRouteTransition = (
  action?: string,
  method?: FormMethod
): Transition => {
  const transition = useTransition();
  const currentAction = useFormAction(action, method);
  return transition.submission?.action === currentAction
    ? transition
    : {
        state: "idle",
        type: "idle",
        submission: undefined,
        location: undefined,
      };
};
