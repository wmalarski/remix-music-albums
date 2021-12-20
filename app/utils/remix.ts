import { Transition } from "@remix-run/react/transition";
import { useState } from "react";
import {
  FormMethod,
  json as remixJson,
  useFormAction,
  useNavigate,
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

type UseIsOpenRouteReturn = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useIsOpen = (redirect: string): UseIsOpenRouteReturn => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);
  const onOpen = () => navigate(redirect);

  return { isOpen, onClose, onOpen };
};
