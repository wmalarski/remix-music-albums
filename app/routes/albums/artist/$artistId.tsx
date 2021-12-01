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
import { ArtistWithAlbumsFragment } from "~/api/types";
import { Dialog, Divider, ErrorsList, Flex } from "~/components";
import { ArtistDetails } from "~/molecules/artists";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

export const handle: HandleFunction = () => {
  return { route: "artist" };
};

export const action: ActionFunction = async ({ params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);

  const result = await graphqlSdk.DeleteArtist({ id: artistId });

  if (result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });

  return redirect(routes.albums());
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.SelectArtist({ id: Number(params.artistId) });

  const artistFragment = result.data?.artist_by_pk;
  if (!artistFragment) throw new Response("Not Found", { status: 404 });
  return json<ArtistWithAlbumsFragment>(artistFragment);
};

const Artist = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const artist = useLoaderData<ArtistWithAlbumsFragment>();
  const transition = useRouteTransition();

  return (
    <>
      <Dialog>
        <Flex direction="row">
          <ArtistDetails artist={artist} transition={transition} />
          <Divider orientation="vertical" />
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

export default Artist;
