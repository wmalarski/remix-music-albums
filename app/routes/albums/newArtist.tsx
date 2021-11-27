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
  InsertArtist,
  InsertArtistMutation,
  InsertArtistMutationVariables,
} from "~/api/types";
import { routes } from "~/utils/routes";

type NewArtistFormError = {
  name?: boolean;
  sid?: boolean;
  graphql?: FetcherError[];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const sid = formData.get("sid");

  const errors = { name: !name, sid: !sid };
  if (Object.values(errors).includes(true)) return errors;

  invariant(typeof name === "string");
  invariant(typeof sid === "string");

  const result = await jsonFetcher<
    InsertArtistMutation,
    InsertArtistMutationVariables
  >(InsertArtist, { artist: { name, sid } });

  const id = result.data?.insert_artist_one?.id;

  if (!id || result.errors) return { id: true, graphql: result.errors };

  return redirect(routes.artist(id));
};

const NewPost = (): ReactElement => {
  const errors = useActionData<NewArtistFormError>();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Name: {errors?.name && <em>Name is required</em>}
          <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Sid: {errors?.sid && <em>Sid is required</em>}
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

export default NewPost;
