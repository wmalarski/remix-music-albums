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
  NewAlbumForm,
  NewAlbumFormResult,
  validateNewAlbum,
} from "~/molecules/albums";
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
  const validation = validateNewAlbum(formData, artistId);

  if (validation.errors) return json({ errors: validation.errors });

  const result = await graphqlSdk.InsertAlbum(validation.variables);

  const id = result.data?.insert_album_one?.id;
  if (!id || result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(id));
};

const NewAlbum = (): ReactElement => {
  const action = useActionData<NewAlbumActionData>();
  const transition = useTransition();

  return (
    <>
      <NewAlbumForm transition={transition} errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewAlbum;
