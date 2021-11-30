import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher";
import { AlbumWithArtistAndReviewsFragment } from "~/api/types";
import { Dialog, ErrorsList, Flex } from "~/components";
import { AlbumDetails } from "~/molecules/albums";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const handle: HandleFunction = () => {
  return { route: "album" };
};

export const action: ActionFunction = async ({ params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteAlbum({ id: Number(params.albumId) });

  const artist = result.data?.delete_album_by_pk?.artist;
  if (!artist || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
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

  return json<AlbumWithArtistAndReviewsFragment>(albumFragment);
};

const Album = (): ReactElement => {
  const loader = useLoaderData<AlbumWithArtistAndReviewsFragment>();
  const action = useActionData<FetcherActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <Dialog>
        <Flex direction="row">
          <AlbumDetails album={loader} transition={transition} />
          <Outlet />
        </Flex>
        <Dialog.Close to={routes.albums()}>
          <Cross1Icon />
        </Dialog.Close>
      </Dialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Album;
