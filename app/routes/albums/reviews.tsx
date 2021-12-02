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
import { isNumber } from "~/utils/validation";

const LIMIT = 30;
const DATA_OVERSCAN = 5;

const getStartLimit = (searchParams: URLSearchParams) => ({
  start: Number(searchParams.get("start") || "0"),
  limit: Number(searchParams.get("limit") || LIMIT.toString()),
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
  const { start, limit } = getStartLimit(new URL(request.url).searchParams);

  console.log({ start, limit, url: request.url });

  const result = await graphqlSdk.SelectReviews({
    limit,
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
  const { start, limit } = getStartLimit(searchParams);
  const transition = useRouteTransition();

  const parentRef = useRef<HTMLDivElement>(null);

  const size = query.review_aggregate.aggregate?.count ?? 0;
  const rowVirtualizer = useVirtual({
    size,
    parentRef,
    estimateSize: useCallback(() => 8, []),
  });

  console.log("reviews", { query, start, limit, size });

  const lowerBoundary = start + DATA_OVERSCAN;
  const upperBoundary = start + limit - DATA_OVERSCAN;
  const middleCount = Math.ceil(limit / 2);
  const firstVirtualItem = rowVirtualizer.virtualItems.at(0);
  const lastVirtualItem = rowVirtualizer.virtualItems.at(-1);
  if (!firstVirtualItem || !lastVirtualItem) {
    throw new Error("this should never happen");
  }

  let neededStart = start;

  if (firstVirtualItem.index < lowerBoundary) {
    // user is scrolling up. Move the window up
    neededStart =
      Math.floor((firstVirtualItem.index - middleCount) / DATA_OVERSCAN) *
      DATA_OVERSCAN;
  } else if (lastVirtualItem.index > upperBoundary) {
    // user is scrolling down. Move the window down
    neededStart =
      Math.ceil((lastVirtualItem.index - middleCount) / DATA_OVERSCAN) *
      DATA_OVERSCAN;
  }

  // can't go below 0
  neededStart = Math.max(neededStart, 0);

  console.log({ neededStart });

  useEffect(() => {
    if (neededStart !== start) {
      setSearchParams({
        start: String(neededStart),
        limit: LIMIT.toString(),
      });
    }
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
        <Dialog.Close to={routes.albums()}>
          <Cross1Icon />
        </Dialog.Close>
      </Dialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;

/**

import * as React from "react";
import { useVirtual } from "react-virtual";
import {
  json,
  LoaderFunction,
  LinksFunction,
  useLoaderData,
  useSearchParams,
  useTransition,
} from "remix";
import stylesUrl from "~/styles/index.css";
import { countItems, getItems } from "~/utils/backend.server";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

let LIMIT = 200;
let DATA_OVERSCAN = 40;

let getStartLimit = (searchParams: URLSearchParams) => ({
  start: Number(searchParams.get("start") || "0"),
  limit: Number(searchParams.get("limit") || LIMIT.toString()),
});

type LoaderData = {
  items: Array<{ id: string; value: string }>;
  totalItems: number;
};

export let loader: LoaderFunction = async ({ request }) => {
  let { start, limit } = getStartLimit(new URL(request.url).searchParams);
  let data: LoaderData = {
    items: await getItems({ start, limit }),
    totalItems: await countItems(),
  };
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=120",
    },
  });
};

export default function Index() {
  let data = useLoaderData<LoaderData>();
  let transition = useTransition();
  let [searchParams, setSearchParams] = useSearchParams();

  let { start, limit } = getStartLimit(searchParams);

  let parentRef = React.useRef<HTMLDivElement>(null);

  let rowVirtualizer = useVirtual({
    size: data.totalItems,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
  });

  // start    lower           middle          upper      end
  // |          |               |               |          |
  //           .................... <-- shift middle to lower
  //                           .................. <-- shift middle to upper

  let lowerBoundary = start + DATA_OVERSCAN;
  let upperBoundary = start + limit - DATA_OVERSCAN;
  let middleCount = Math.ceil(limit / 2);
  let firstVirtualItem = rowVirtualizer.virtualItems.at(0);
  let lastVirtualItem = rowVirtualizer.virtualItems.at(-1);
  if (!firstVirtualItem || !lastVirtualItem) {
    throw new Error("this should never happen");
  }

  let neededStart = start;

  if (firstVirtualItem.index < lowerBoundary) {
    // user is scrolling up. Move the window up
    neededStart =
      Math.floor((firstVirtualItem.index - middleCount) / DATA_OVERSCAN) *
      DATA_OVERSCAN;
  } else if (lastVirtualItem.index > upperBoundary) {
    // user is scrolling down. Move the window down
    neededStart =
      Math.ceil((lastVirtualItem.index - middleCount) / DATA_OVERSCAN) *
      DATA_OVERSCAN;
  }

  // can't go below 0
  if (neededStart < 0) {
    neededStart = 0;
  }

  // can't go above our data
  if (neededStart + limit > data.totalItems) {
    neededStart = data.totalItems - limit;
  }

  React.useEffect(() => {
    if (neededStart !== start) {
      setSearchParams({
        start: String(neededStart),
        limit: LIMIT.toString(),
      });
    }
  }, [start, neededStart, setSearchParams]);

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `800px`,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            let item = data.items[Math.abs(start - virtualRow.index)];

            return (
              <div
                key={virtualRow.key}
                className={
                  virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"
                }
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {virtualRow.index}{" "}
                {item
                  ? item.value
                  : transition.state === "loading"
                  ? "Loading more..."
                  : "Nothing to see here..."}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


*/
