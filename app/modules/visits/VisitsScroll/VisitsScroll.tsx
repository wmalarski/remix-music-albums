import { ReactElement, useCallback, useRef } from "react";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useScrollNavigation } from "~/hooks/useScrollNavigation";
import { SelectVisitsQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { VisitsList } from "./VisitsList/VisitsList";

type Props = {
  query: SelectVisitsQuery;
};

export const VisitsScroll = ({ query }: Props): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.visitAggregate.aggregate?.count ?? 0;

  const isDesktop = useMediaQuery("bp2");

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => (isDesktop ? 260 : 510), [isDesktop]),
    initialRect: { width: 250, height: 251 },
    route: routes.visits,
  });

  return (
    <VisitsList
      ref={parentRef}
      start={start}
      virtualizer={virtualizer}
      visits={query.visit}
    />
  );
};
