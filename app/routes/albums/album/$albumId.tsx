import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { AlbumWithArtistFragment } from "~/api/types.server";
import { ErrorsList, Flex } from "~/components";
import { AlbumDetails, AlbumRoot, AlbumTabs } from "~/modules/albums";
import { NavigationDialog } from "~/modules/layout";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ params, request }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteAlbum({ id: Number(params.albumId) });

  const artist = result.data?.deleteAlbumByPk?.artist;
  if (!artist || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.artist(artist));
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!isNumber(params.albumId))
    throw new Response("Album Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);

  const albumId = Number(params.albumId);
  const [result] = await Promise.all([
    graphqlSdk.SelectAlbum({ id: albumId }),
    user
      ? graphqlSdk.InsertVisit({
          visit: { album: albumId, profile: user.profileId },
        })
      : Promise.resolve(true),
  ]);

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  const albumFragment = result.data?.albumByPk;
  if (!albumFragment) throw new Response("Album Not Found", { status: 404 });

  return json<AlbumWithArtistFragment>(albumFragment);
};

const Album = (): ReactElement => {
  const album = useLoaderData<AlbumWithArtistFragment>();
  const action = useActionData<FetcherActionData>();

  return (
    <AlbumRoot album={album}>
      <NavigationDialog to={routes.albums}>
        <Flex direction="row" gap={2}>
          <AlbumDetails />
          <AlbumTabs>
            <Outlet />
          </AlbumTabs>
        </Flex>
      </NavigationDialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </AlbumRoot>
  );
};

export default Album;
