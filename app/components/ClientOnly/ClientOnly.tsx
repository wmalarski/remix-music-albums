import { ReactElement, ReactNode } from "react";
import { useHydrated } from "~/hooks/useHydrated";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

export const ClientOnly = ({
  children,
  fallback = null,
}: Props): ReactElement => {
  return useHydrated() ? <>{children}</> : <>{fallback}</>;
};
