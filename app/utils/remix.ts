import { Transition } from "@remix-run/react/transition";
import {
  FormMethod,
  json as remixJson,
  useFormAction,
  useTransition,
} from "remix";

export const json = <TData>(
  data: TData,
  init?: Parameters<typeof remixJson>[1]
): ReturnType<typeof remixJson> => remixJson(data, init);

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
