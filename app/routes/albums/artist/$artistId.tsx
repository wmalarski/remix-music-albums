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
import { ArtistWithAlbumsFragment } from "~/api/types.server";
import { ErrorsList } from "~/components";
import { ArtistDialog, ArtistRoot } from "~/molecules/artists";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ params, request }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteArtist({ id: artistId });

  if (result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });

  return redirect(routes.albums);
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.SelectArtist({ id: Number(params.artistId) });

  const artistFragment = result.data?.artistByPk;
  if (!artistFragment) throw new Response("Not Found", { status: 404 });
  return json<ArtistWithAlbumsFragment>(artistFragment);
};

const Artist = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const artist = useLoaderData<ArtistWithAlbumsFragment>();

  return (
    <ArtistRoot artist={artist}>
      <ArtistDialog>
        <Outlet />
      </ArtistDialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </ArtistRoot>
  );
};

export default Artist;
