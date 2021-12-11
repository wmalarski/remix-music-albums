import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { AlbumWithArtistAndReviewsFragment } from "~/api/types.server";
import { ErrorsList } from "~/components";
import {
  EditAlbumForm,
  EditAlbumFormResult,
  validateEditAlbum,
} from "~/molecules/albums";
import {
  HandleFunction,
  json,
  useRouteLoaderData,
  useRouteTransition,
} from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: EditAlbumFormResult["errors"];
};

export const handle: HandleFunction = () => {
  return { route: "editAlbum" };
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const validation = validateEditAlbum({ albumId, formData });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.UpdateAlbum(validation.variables);
  if (result.errors) return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
};

const EditAlbum = (): ReactElement => {
  const album = useRouteLoaderData<AlbumWithArtistAndReviewsFragment>("album");
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <EditAlbumForm
        transition={transition}
        errors={action?.errors}
        album={album}
      />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default EditAlbum;
