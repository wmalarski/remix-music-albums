import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement, useCallback, useEffect, useRef } from "react";
import { useVirtual } from "react-virtual";
import { LoaderFunction, useLoaderData, useSearchParams } from "remix";
import { graphqlSdk } from "~/api/fetcher";
import { SelectVisitsQuery } from "~/api/types";
import { Dialog, Heading } from "~/components";
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
  const size = query.visitAggregate.aggregate?.count ?? 0;

  const parentRef = useRef<HTMLDivElement>(null);
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
    <Dialog>
      <Heading>Visits</Heading>
      <VisitsList
        ref={parentRef}
        start={start}
        virtualizer={virtualizer}
        visits={query.visit}
      />
      <Dialog.Close to={routes.albums}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Visits;
