import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import {
  LoaderFunction,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "remix";
import { graphqlSdk } from "~/api/fetcher.server";
import { SelectVisitsQuery } from "~/api/types.server";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { VisitsList } from "~/molecules/visits";
import { HandleFunction, json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { getScrollStart } from "~/utils/scroll";

const LIMIT = 20;
const DATA_OVER_SCAN = 5;

const getStartParam = (searchParams: URLSearchParams) => ({
  start: Number(searchParams.get("startVisits") || "0"),
});

export const handle: HandleFunction = () => {
  return { route: "visits" };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { start } = getStartParam(new URL(request.url).searchParams);

  const result = await graphqlSdk.SelectVisits({ limit: LIMIT, offset: start });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectVisitsQuery>(
    result.data ?? { visit: [], visitAggregate: {} }
  );
};

const Visits = (): ReactElement => {
  const query = useLoaderData<SelectVisitsQuery>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { start } = getStartParam(searchParams);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  const parentRef = useRef<HTMLDivElement>(null);
  const size = query.visitAggregate.aggregate?.count ?? 0;
  const virtualizer = useVirtual({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
    overscan: DATA_OVER_SCAN,
  });

  const neededStart = getScrollStart({
    items: virtualizer.virtualItems,
    limit: LIMIT,
    overScan: DATA_OVER_SCAN,
    start: start,
  });

  useEffect(() => {
    if (neededStart === start) return;
    setSearchParams({ start: String(neededStart) });
  }, [start, neededStart, setSearchParams]);

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
