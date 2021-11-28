import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement, useMemo } from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  AlbumWithArtistAndReviewsFragment,
  DeleteAlbum,
  DeleteAlbumMutation,
  DeleteAlbumMutationVariables,
  InsertVisit,
  InsertVisitMutation,
  InsertVisitMutationVariables,
  ReviewWithAlbumAndArtistFragment,
  SelectAlbum,
  SelectAlbumQuery,
  SelectAlbumQueryVariables,
} from "~/api/types";
import { Dialog } from "~/components";
import { AlbumDetails } from "~/molecules/albums";
import { ReviewList } from "~/molecules/reviews";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type AlbumActionData = {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const albumId = Number(params.albumId);

  const result = await jsonFetcher<
    DeleteAlbumMutation,
    DeleteAlbumMutationVariables
  >(DeleteAlbum, { id: albumId });

  const artist = result.data?.delete_album_by_pk?.artist;

  console.log("albumId action", JSON.stringify(result, null, 2));

  if (!artist || result.errors) return json({ fetcherErrors: result.errors });

  return redirect(routes.artist(artist));
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const profile = 1; // TODO add profiles
  const id = Number(params.albumId);
  const [payload, result] = await Promise.all([
    jsonFetcher<SelectAlbumQuery, SelectAlbumQueryVariables>(SelectAlbum, {
      id,
    }),
    jsonFetcher<InsertVisitMutation, InsertVisitMutationVariables>(
      InsertVisit,
      { visit: { album: id, profile } }
    ),
  ]);

  console.log("albumId", JSON.stringify({ payload, result }, null, 2));

  const albumFragment = payload.data?.album_by_pk;
  if (!albumFragment) throw new Response("Not Found", { status: 404 });
  return json(albumFragment);
};

const Album = (): ReactElement => {
  const album = useLoaderData<AlbumWithArtistAndReviewsFragment>();
  const action = useActionData<AlbumActionData>();
  const transition = useTransition();

  const reviews = useMemo<ReviewWithAlbumAndArtistFragment[]>(() => {
    const { reviews: albumReviews, ...albumByAlbum } = album;
    return albumReviews?.map((review) => ({ ...review, albumByAlbum }));
  }, [album]);

  return (
    <Dialog>
      <AlbumDetails
        album={album}
        fetcherErrors={action?.fetcherErrors}
        transition={transition}
      />
      <ReviewList reviews={reviews} transition={transition} />
      <Outlet />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Album;
