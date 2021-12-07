import { ReactElement, useCallback, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";
import { ActionFunction, redirect, useActionData } from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import {
  AlbumWithArtistAndReviewsFragment,
  ReviewWithAlbumAndArtistFragment,
} from "~/api/types.server";
import { ErrorsList, Flex, Heading } from "~/components";
import { AlbumReviewsList } from "~/molecules/albums/AlbumReviewsList/AlbumReviewsList";
import {
  HandleFunction,
  json,
  useRouteLoaderData,
  useRouteTransition,
} from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

const DATA_OVER_SCAN = 5;

export const handle: HandleFunction = () => {
  return { route: "album/index" };
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId))
    throw new Response("Review Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  if (result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(Number(params.albumId)));
};

const AlbumReviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const album = useRouteLoaderData<AlbumWithArtistAndReviewsFragment>("album");
  const transition = useRouteTransition();

  const reviews = useMemo<ReviewWithAlbumAndArtistFragment[]>(() => {
    if (!album) return [];
    const { reviews: albumReviews, ...albumByAlbum } = album;
    return albumReviews?.map((review) => ({ ...review, albumByAlbum }));
  }, [album]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtual({
    size: reviews.length,
    parentRef,
    estimateSize: useCallback(() => 300, []),
    initialRect: { width: 100, height: 40 },
    overscan: DATA_OVER_SCAN,
  });

  return (
    <>
      <Flex direction="column">
        <Heading size="medium">Reviews</Heading>
        <AlbumReviewsList
          ref={parentRef}
          albumId={album.id}
          reviews={reviews}
          transition={transition}
          start={0}
          virtualizer={virtualizer}
        />
      </Flex>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default AlbumReviews;
