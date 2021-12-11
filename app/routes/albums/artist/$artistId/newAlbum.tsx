import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ErrorsList } from "~/components";
import {
  NewAlbumForm,
  NewAlbumFormResult,
  validateNewAlbum,
} from "~/molecules/albums";
import { json, useRouteTransition } from "~/utils/remix";
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

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.InsertAlbum(validation.variables);

  const id = result.data?.insertAlbumOne?.id;
  if (!id || result.errors)
    return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(id));
};

const NewAlbum = (): ReactElement => {
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <NewAlbumForm transition={transition} errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewAlbum;
