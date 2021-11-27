import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useTransition } from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertArtist,
  InsertArtistMutation,
  InsertArtistMutationVariables,
} from "~/api/types";
import { NewArtistForm, NewArtistFormResult } from "~/molecules/artists";
import { routes } from "~/utils/routes";

type NewArtistActionData = {
  errors?: NewArtistFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { variables, errors } = NewArtistForm.validate(formData);

  if (errors) return { errors };

  const result = await jsonFetcher<
    InsertArtistMutation,
    InsertArtistMutationVariables
  >(InsertArtist, variables);

  const id = result.data?.insert_artist_one?.id;

  if (!id || result.errors) return { fetcherErrors: result.errors };

  return redirect(routes.artist(id).toString());
};

const NewArtist = (): ReactElement => {
  const action = useActionData<NewArtistActionData>();
  const transition = useTransition();

  return (
    <NewArtistForm
      transition={transition}
      validationErrors={action?.errors}
      fetcherErrors={action?.fetcherErrors}
    />
  );
};

export default NewArtist;
