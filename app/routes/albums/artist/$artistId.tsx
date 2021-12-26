import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { ErrorsList } from "~/components";
import { ArtistDetails, ArtistRoot, ArtistTabs } from "~/modules/artist";
import { NavigationDialog } from "~/modules/layout";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { ArtistFragment } from "~/services/types.server";
import { json, notAuthorized, notFound } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ params, request }) => {
  if (!isNumber(params.artistId)) throw notFound();

  const artistId = Number(params.artistId);

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.DeleteArtist({
    id: artistId,
    profile: user.profileId,
  });

  if (!result.data?.deleteArtist?.returning.length) return notAuthorized();
  if (result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });

  return redirect(routes.albums);
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.artistId)) throw notFound();

  const result = await graphqlSdk.SelectArtist({ id: Number(params.artistId) });

  const artistFragment = result.data?.artistByPk;
  if (!artistFragment) throw notFound();
  return json<ArtistFragment>(artistFragment);
};

const Artist = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const artist = useLoaderData<ArtistFragment>();

  return (
    <ArtistRoot artist={artist}>
      <NavigationDialog to={routes.albums} header={<ArtistDetails />}>
        <ArtistTabs>
          <Outlet />
        </ArtistTabs>
      </NavigationDialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </ArtistRoot>
  );
};

export default Artist;
