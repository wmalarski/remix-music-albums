import { Cross1Icon } from "@radix-ui/react-icons";
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
  InsertArtist,
  InsertArtistMutation,
  InsertArtistMutationVariables,
} from "~/api/types";
import { Dialog } from "~/components";
import {
  NewArtistForm,
  NewArtistFormResult,
  validateNewArtist,
} from "~/molecules/artists";
import { routes } from "~/utils/routes";

type NewArtistActionData = {
  errors?: NewArtistFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { variables, errors } = validateNewArtist(formData);

  if (errors) return json({ errors });

  const result = await jsonFetcher<
    InsertArtistMutation,
    InsertArtistMutationVariables
  >(InsertArtist, variables);

  const id = result.data?.insert_artist_one?.id;
  if (!id || result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.artist(id));
};

const NewArtist = (): ReactElement => {
  const action = useActionData<NewArtistActionData>();
  const transition = useTransition();

  return (
    <Dialog>
      <NewArtistForm
        transition={transition}
        validationErrors={action?.errors}
        fetcherErrors={action?.fetcherErrors}
      />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default NewArtist;
