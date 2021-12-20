import { ReactElement, useCallback, useRef, useState } from "react";
import { LoaderFunction, useLoaderData, useNavigate } from "remix";
import { graphqlSdk } from "~/api/fetcher.server";
import { SelectVisitsQuery } from "~/api/types.server";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { VisitsList } from "~/molecules/visits";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import {
  getRequestStart,
  scrollConfig,
  useScrollNavigation,
} from "~/utils/scroll";

export const loader: LoaderFunction = async ({ request }) => {
  const start = getRequestStart(request);

  const result = await graphqlSdk.SelectVisits({
    limit: scrollConfig.limit,
    offset: start,
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectVisitsQuery>(
    result.data ?? { visit: [], visitAggregate: {} }
  );
};

const Visits = (): ReactElement => {
  const query = useLoaderData<SelectVisitsQuery>();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  const parentRef = useRef<HTMLDivElement>(null);
  const size = query.visitAggregate.aggregate?.count ?? 0;

  const { start, virtualizer } = useScrollNavigation({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
  });

  return (
    <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={handleCloseClick}>Visits</DialogHeader>
          <VisitsList
            ref={parentRef}
            start={start}
            virtualizer={virtualizer}
            visits={query.visit}
          />
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};

export default Visits;
