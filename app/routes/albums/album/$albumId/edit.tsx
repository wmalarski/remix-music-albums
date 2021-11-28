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
  AlbumWithArtistAndReviewsFragment,
  UpdateAlbum,
  UpdateAlbumMutation,
  UpdateAlbumMutationVariables,
} from "~/api/types";
import { ErrorsList } from "~/components";
import {
  EditAlbumForm,
  EditAlbumFormResult,
  validateEditAlbum,
} from "~/molecules/albums";
import { routes } from "~/utils/routes";
import { useRouteLoaderData } from "~/utils/useRouteLoaderData";
import { isNumber } from "~/utils/validation";

type NewReviewActionData = {
  errors?: EditAlbumFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const { variables, errors } = validateEditAlbum({ albumId, formData });

  if (errors) return json({ errors });

  const result = await jsonFetcher<
    UpdateAlbumMutation,
    UpdateAlbumMutationVariables
  >(UpdateAlbum, variables);

  if (result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
};

const EditAlbum = (): ReactElement => {
  const album = useRouteLoaderData<AlbumWithArtistAndReviewsFragment>(1);
  const action = useActionData<NewReviewActionData>();
  const transition = useTransition();

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
