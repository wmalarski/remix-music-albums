import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useTransition } from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher";
import { ErrorsList } from "~/components";
import {
  NewAlbumForm,
  NewAlbumFormResult,
  validateNewAlbum,
} from "~/molecules/albums";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: NewAlbumFormResult["errors"];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);
  const formData = await request.formData();
  const validation = validateNewAlbum(formData, artistId);

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.InsertAlbum(validation.variables);

  const id = result.data?.insert_album_one?.id;
  if (!id || result.errors)
    return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(id));
};

const NewAlbum = (): ReactElement => {
  const action = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <>
      <NewAlbumForm transition={transition} errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewAlbum;
