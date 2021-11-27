import { ReactElement } from "react";
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertAlbum,
  InsertAlbumMutation,
  InsertAlbumMutationVariables,
} from "~/api/types";
import { validateNewAlbum, ValidateNewAlbumResult } from "~/api/validators";
import { routes } from "~/utils/routes";

type NewAlbumActionData = ValidateNewAlbumResult & {
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.artistId, "expected params.artistId");
  invariant(/^\d+$/.test(params.artistId), "params.artistId not number");

  const artistId = Number(params.artistId);
  const formData = await request.formData();
  const { variables, validationErrors } = validateNewAlbum(formData, artistId);

  if (validationErrors) return { validationErrors };

  const result = await jsonFetcher<
    InsertAlbumMutation,
    InsertAlbumMutationVariables
  >(InsertAlbum, variables);

  const id = result.data?.insert_album_one?.id;

  if (!id || result.errors) return { fetcherErrors: result.errors };

  return redirect(routes.album(id));
};

const NewAlbum = (): ReactElement => {
  const action = useActionData<NewAlbumActionData>();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Title: {action?.validationErrors?.title && <em>Title is required</em>}
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Year: {action?.validationErrors?.year && <em>Year is required</em>}
          <input type="number" name="year" />
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
          {transition.submission ? "Creating..." : "Create Album"}
        </button>
      </p>
    </Form>
  );
};

export default NewAlbum;
