import { Transition } from "@remix-run/react/transition";
import { FormMethod, useFormAction, useTransition } from "remix";

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
