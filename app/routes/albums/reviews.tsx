import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement, useCallback, useEffect, useRef } from "react";
import { useVirtual } from "react-virtual";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher";
import { SelectReviewsQuery } from "~/api/types";
import { Dialog, ErrorsList, Heading } from "~/components";
import { ReviewList } from "~/molecules/reviews";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { getScrollStart } from "~/utils/scroll";
import { isNumber } from "~/utils/validation";

const LIMIT = 20;
const DATA_OVER_SCAN = 5;

const getStartParam = (searchParams: URLSearchParams) => ({
  start: Number(searchParams.get("startReviews") || "0"),
});

export const handle: HandleFunction = () => {
  return { route: "reviews" };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  const album = result.data?.delete_review_by_pk?.album;
  if (!album || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ request }) => {
  const { start } = getStartParam(new URL(request.url).searchParams);

  const result = await graphqlSdk.SelectReviews({
    limit: LIMIT,
    offset: Math.max(start, 0),
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectReviewsQuery>(
    result.data ?? { review: [], review_aggregate: {} }
  );
};

const Reviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const query = useLoaderData<SelectReviewsQuery>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { start } = getStartParam(searchParams);
  const transition = useRouteTransition();

  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.review_aggregate.aggregate?.count ?? 0;
  const rowVirtualizer = useVirtual({
    size,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
    overscan: DATA_OVER_SCAN,
  });

  const neededStart = getScrollStart({
    items: rowVirtualizer.virtualItems,
    limit: LIMIT,
    overScan: DATA_OVER_SCAN,
    start: start,
  });

  useEffect(() => {
    if (neededStart === start) return;
    setSearchParams({ start: String(neededStart) });
  }, [start, neededStart, setSearchParams]);

  return (
    <>
      <Dialog>
        <Heading>Reviews</Heading>
        <ReviewList
          ref={parentRef}
          start={start}
          reviews={query.review}
          transition={transition}
          virtualizer={rowVirtualizer}
        />
        <Dialog.Close to={routes.albums}>
          <Cross1Icon />
        </Dialog.Close>
      </Dialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;
