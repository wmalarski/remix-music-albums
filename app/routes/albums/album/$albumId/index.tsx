import { ReactElement, useMemo } from "react";
import { ActionFunction, redirect, useActionData, useTransition } from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
  ReviewWithAlbumAndArtistFragment,
} from "~/api/types";
import { ErrorsList } from "~/components";
import { AlbumReviewsList } from "~/molecules/albums/AlbumReviewsList/AlbumReviewsList";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { useRouteLoaderData } from "~/utils/useRouteLoaderData";
import { isNumber } from "~/utils/validation";

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
  const album = useRouteLoaderData<AlbumWithArtistAndReviewsFragment>(1);
  const transition = useTransition();

  const reviews = useMemo<ReviewWithAlbumAndArtistFragment[]>(() => {
    if (!album) return [];
    const { reviews: albumReviews, ...albumByAlbum } = album;
    return albumReviews?.map((review) => ({ ...review, albumByAlbum }));
  }, [album]);

  return (
    <>
      <AlbumReviewsList
        albumId={album.id}
        reviews={reviews}
        transition={transition}
      />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default AlbumReviews;
