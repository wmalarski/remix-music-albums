import { ReactElement, useMemo } from "react";
import { ActionFunction, redirect, useTransition } from "remix";
import { graphqlSdk } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
  ReviewWithAlbumAndArtistFragment,
} from "~/api/types";
import { AlbumReviewsList } from "~/molecules/albums/AlbumReviewsList/AlbumReviewsList";
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
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return redirect(routes.album(Number(params.albumId)));
};

const AlbumReviews = (): ReactElement => {
  const album = useRouteLoaderData<AlbumWithArtistAndReviewsFragment>(1);
  const transition = useTransition();

  const reviews = useMemo<ReviewWithAlbumAndArtistFragment[]>(() => {
    if (!album) return [];
    const { reviews: albumReviews, ...albumByAlbum } = album;
    return albumReviews?.map((review) => ({ ...review, albumByAlbum }));
  }, [album]);

  return <AlbumReviewsList reviews={reviews} transition={transition} />;
};

export default AlbumReviews;
