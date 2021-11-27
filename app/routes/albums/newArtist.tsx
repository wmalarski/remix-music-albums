import { ReactElement } from "react";
import {
  ActionFunction,
  Form,
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
import { validateNewArtist, ValidateNewArtistResult } from "~/api/validators";
import { routes } from "~/utils/routes";

type NewArtistActionData = ValidateNewArtistResult & {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { variables, validationErrors } = validateNewArtist(formData);

  if (validationErrors) return { validationErrors };

  const result = await jsonFetcher<
    InsertArtistMutation,
    InsertArtistMutationVariables
  >(InsertArtist, variables);

  const id = result.data?.insert_artist_one?.id;

  if (!id || result.errors) return { fetcherErrors: result.errors };

  return redirect(routes.artist(id));
};

const NewArtist = (): ReactElement => {
  const action = useActionData<NewArtistActionData>();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Name: {action?.validationErrors?.name && <em>Name is required</em>}
          <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Sid: {action?.validationErrors?.sid && <em>Sid is required</em>}
          <input type="text" name="sid" />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Artist"}
        </button>
      </p>
    </Form>
  );
};

export default NewArtist;
