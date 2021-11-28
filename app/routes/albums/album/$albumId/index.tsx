import { ReactElement, useMemo } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  useMatches,
  useTransition,
} from "remix";
import { jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
  DeleteReview,
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
  ReviewWithAlbumAndArtistFragment,
} from "~/api/types";
import { AlbumReviewsList } from "~/molecules/albums/AlbumReviewsList/AlbumReviewsList";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type AlbumReviewsLoaderData = {
  albumId: number;
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId))
    throw new Response("Review Not Found", { status: 404 });

  const result = await jsonFetcher<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DeleteReview, { id: Number(reviewId) });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return redirect(routes.album(Number(params.albumId)));
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  return json({ albumId: Number(params.albumId) });
};

const AlbumReviews = (): ReactElement => {
  const loader = useLoaderData<AlbumReviewsLoaderData>();
  const transition = useTransition();

  const matches = useMatches();

  const reviews = useMemo<ReviewWithAlbumAndArtistFragment[]>(() => {
    const albumPathname = routes.album(loader.albumId);
    const matched = matches.find((match) => match.pathname === albumPathname);
    if (!matched) return [];

    const album = matched.data as AlbumWithArtistAndReviewsFragment;
    const { reviews: albumReviews, ...albumByAlbum } = album;
    return albumReviews?.map((review) => ({ ...review, albumByAlbum }));
  }, [loader.albumId, matches]);

  return <AlbumReviewsList reviews={reviews} transition={transition} />;
};

export default AlbumReviews;
