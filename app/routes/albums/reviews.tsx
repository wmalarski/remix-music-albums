import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useVirtual } from "react-virtual";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { SelectReviewsQuery } from "~/api/types.server";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  ErrorsList,
  Flex,
} from "~/components";
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

  const album = result.data?.deleteReviewByPk?.album;
  if (!album || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ request }) => {
  const { start } = getStartParam(new URL(request.url).searchParams);

  const result = await graphqlSdk.SelectReviews({
    limit: LIMIT,
    offset: start,
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectReviewsQuery>(
    result.data ?? { review: [], reviewAggregate: {} }
  );
};

const Reviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const query = useLoaderData<SelectReviewsQuery>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { start } = getStartParam(searchParams);
  const transition = useRouteTransition();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  const parentRef = useRef<HTMLDivElement>(null);
  const size = query.reviewAggregate.aggregate?.count ?? 0;
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
    <>
      <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <Flex direction="column">
            <DialogHeader onClose={handleCloseClick}>Reviews</DialogHeader>
            <DialogDescription>
              <ReviewList
                ref={parentRef}
                start={start}
                reviews={query.review}
                transition={transition}
                virtualizer={virtualizer}
              />
            </DialogDescription>
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;
