import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useTransition } from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertAlbum,
  InsertAlbumMutation,
  InsertAlbumMutationVariables,
} from "~/api/types";
import { NewAlbumForm, NewAlbumFormResult } from "~/molecules/albums";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type NewAlbumActionData = {
  errors?: NewAlbumFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);
  const formData = await request.formData();
  const { variables, errors } = NewAlbumForm.validate(formData, artistId);

  if (errors) return { errors };

  const result = await jsonFetcher<
    InsertAlbumMutation,
    InsertAlbumMutationVariables
  >(InsertAlbum, variables);

  const id = result.data?.insert_album_one?.id;

  if (!id || result.errors) return { fetcherErrors: result.errors };

  return redirect(routes.album(id).toString());
};

const NewAlbum = (): ReactElement => {
  const action = useActionData<NewAlbumActionData>();
  const transition = useTransition();

  return (
    <NewAlbumForm
      transition={transition}
      validationErrors={action?.errors}
      fetcherErrors={action?.fetcherErrors}
    />
  );
};

export default NewAlbum;
