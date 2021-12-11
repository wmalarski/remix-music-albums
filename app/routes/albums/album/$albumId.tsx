import { ReactElement, useState } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { AlbumWithArtistAndReviewsFragment } from "~/api/types.server";
import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  Divider,
  ErrorsList,
  Flex,
} from "~/components";
import { AlbumDetails } from "~/molecules/albums";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const handle: HandleFunction = () => {
  return { route: "album" };
};

export const action: ActionFunction = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteAlbum({ id: Number(params.albumId) });

  const artist = result.data?.deleteAlbumByPk?.artist;
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

  const albumFragment = result.data?.albumByPk;
  if (!albumFragment) throw new Response("Album Not Found", { status: 404 });

  return json<AlbumWithArtistAndReviewsFragment>(albumFragment);
};

const Album = (): ReactElement => {
  const album = useLoaderData<AlbumWithArtistAndReviewsFragment>();
  const action = useActionData<FetcherActionData>();
  const transition = useRouteTransition();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  return (
    <>
      <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <Flex direction="column">
            <DialogHeader onClose={handleCloseClick}>
              {album.title}
            </DialogHeader>
            <Flex direction="row">
              <AlbumDetails album={album} transition={transition} />
              <Divider orientation="vertical" />
              <Outlet />
            </Flex>
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Album;
