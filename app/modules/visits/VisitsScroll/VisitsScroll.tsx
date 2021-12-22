import { ReactElement, useCallback, useRef } from "react";
import { SelectVisitsQuery } from "~/services/types.server";
import { routes } from "~/utils/routes";
import { useScrollNavigation } from "~/utils/scroll";
import { VisitsList } from "./VisitsList/VisitsList";

type Props = {
  query: SelectVisitsQuery;
};

export const VisitsScroll = ({ query }: Props): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.visitAggregate.aggregate?.count ?? 0;

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
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
