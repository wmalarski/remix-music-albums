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
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ArtistWithAlbumsFragment } from "~/api/types.server";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  Divider,
  ErrorsList,
  Flex,
} from "~/components";
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
              {artist.name}
            </DialogHeader>
            <DialogDescription>
              <Flex direction="row">
                <ArtistDetails artist={artist} transition={transition} />
                <Divider orientation="vertical" />
                <Outlet />
              </Flex>
            </DialogDescription>
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Artist;
