import { ReactElement } from "react";
import {
  ActionFunction,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { FetcherError, graphqlSdk } from "~/api/fetcher";
import { ErrorsList } from "~/components";
import {
  EditArtistForm,
  EditArtistFormResult,
  validateEditArtist,
} from "~/molecules/artists";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type EditArtistActionData = {
  errors?: EditArtistFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);
  const formData = await request.formData();
  const validation = validateEditArtist({ formData, artistId });

  if (validation.errors) return json({ errors: validation.errors });

  const result = await graphqlSdk.UpdateArtist(validation.variables);

  if (result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.artist(artistId));
};

const EditAlbum = (): ReactElement => {
  const action = useActionData<EditArtistActionData>();
  const transition = useTransition();

  return (
    <>
      <EditArtistForm transition={transition} errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default EditAlbum;
