import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { ErrorsList, Flex } from "~/components";
import {
  AlbumDetails,
  AlbumHeader,
  AlbumRoot,
  AlbumTabs,
} from "~/modules/album";
import { NavigationDialog } from "~/modules/layout";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { AlbumWithArtistFragment } from "~/services/types.server";
import { json, notAuthorized, notFound } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ params, request }) => {
  if (!isNumber(params.albumId)) throw notFound();

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteAlbum({
    id: Number(params.albumId),
    profile: user.profileId,
  });

  console.log(JSON.stringify({ result, user }, null, 2));

  if (!result.data?.deleteAlbum?.returning.length) return notAuthorized();
  const artist = result.data?.deleteAlbum.returning?.[0]?.artist;
  if (!artist || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.artist(artist));
};

export const loader: LoaderFunction = async ({ params, request }) => {
  if (!isNumber(params.albumId)) throw notFound();

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
  if (!albumFragment) throw notFound();

  return json<AlbumWithArtistFragment>(albumFragment);
};

const Album = (): ReactElement => {
  const album = useLoaderData<AlbumWithArtistFragment>();
  const action = useActionData<FetcherActionData>();

  return (
    <AlbumRoot album={album}>
      <NavigationDialog to={routes.albums} header={<AlbumHeader />}>
        <Flex direction="row" gap="md">
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
