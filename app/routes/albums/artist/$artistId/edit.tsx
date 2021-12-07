import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ArtistWithAlbumsFragment } from "~/api/types.server";
import { ErrorsList } from "~/components";
import {
  EditArtistForm,
  EditArtistFormResult,
  validateEditArtist,
} from "~/molecules/artists";
import {
  HandleFunction,
  json,
  useRouteLoaderData,
  useRouteTransition,
} from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: EditArtistFormResult["errors"];
};

export const handle: HandleFunction = () => {
  return { route: "editArtist" };
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);
  const formData = await request.formData();
  const validation = validateEditArtist({ formData, artistId });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.UpdateArtist(validation.variables);

  if (result.errors) return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.artist(artistId));
};

const EditAlbum = (): ReactElement => {
  const artist = useRouteLoaderData<ArtistWithAlbumsFragment>("artist");
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <EditArtistForm
        transition={transition}
        errors={action?.errors}
        artist={artist}
      />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default EditAlbum;
