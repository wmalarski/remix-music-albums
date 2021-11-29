import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
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
import { FetcherError, graphqlSdk } from "~/api/fetcher";
import { AlbumWithArtistAndReviewsFragment } from "~/api/types";
import { Dialog, ErrorsList } from "~/components";
import { AlbumDetails } from "~/molecules/albums";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type AlbumActionData = {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteAlbum({ id: Number(params.albumId) });

  const artist = result.data?.delete_album_by_pk?.artist;
  if (!artist || result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.artist(artist));
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const profileId = 1; // TODO add profiles
  const albumId = Number(params.albumId);
  const [result] = await Promise.all([
    graphqlSdk.SelectAlbum({ id: albumId }),
    graphqlSdk.InsertVisit({ visit: { album: albumId, profile: profileId } }),
  ]);

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  const albumFragment = result.data?.album_by_pk;
  if (!albumFragment) throw new Response("Album Not Found", { status: 404 });

  return json(albumFragment);
};

const Album = (): ReactElement => {
  const loader = useLoaderData<AlbumWithArtistAndReviewsFragment>();
  const action = useActionData<AlbumActionData>();
  const transition = useTransition();

  return (
    <>
      <Dialog>
        <AlbumDetails album={loader} transition={transition} />
        <Outlet />
        <Dialog.Close to={routes.albums()}>
          <Cross1Icon />
        </Dialog.Close>
      </Dialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Album;
