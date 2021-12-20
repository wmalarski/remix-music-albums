import { ReactElement, useCallback, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";
import { ActionFunction, redirect, useActionData, useLocation } from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types.server";
import { ErrorsList, TabsContent } from "~/components";
import { useAlbumRoot } from "~/molecules/albums";
import { AlbumReviewsList } from "~/molecules/albums/AlbumReviewsList/AlbumReviewsList";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

const DATA_OVER_SCAN = 5;

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId))
    throw new Response("Review Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  if (result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(Number(params.albumId)));
};

const AlbumReviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const album = useAlbumRoot();

  const location = useLocation();

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
    <TabsContent value={location.pathname}>
      <AlbumReviewsList
        ref={parentRef}
        reviews={reviews}
        start={0}
        virtualizer={virtualizer}
      />
      <ErrorsList errors={action?.fetcherErrors} />
    </TabsContent>
  );
};

export default AlbumReviews;
