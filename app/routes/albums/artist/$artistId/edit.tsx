import { ReactElement } from "react";
import {
  ActionFunction,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  UpdateArtist,
  UpdateArtistMutation,
  UpdateArtistMutationVariables,
} from "~/api/types";
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
  const { variables, errors } = validateEditArtist({ formData, artistId });

  if (errors) return json({ errors });

  const result = await jsonFetcher<
    UpdateArtistMutation,
    UpdateArtistMutationVariables
  >(UpdateArtist, variables);

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
