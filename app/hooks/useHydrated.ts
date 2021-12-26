import { useEffect, useState } from "react";

// eslint-disable-next-line jest/require-hook
let hydrating = true;

export const useHydrated = (): boolean => {
  const [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(function hydrate() {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
};
