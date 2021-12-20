import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useLocation } from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ErrorsList, TabsContent } from "~/components";
import {
  EditAlbumForm,
  EditAlbumFormResult,
  validateEditAlbum,
} from "~/molecules/albums";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: EditAlbumFormResult["errors"];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const validation = validateEditAlbum({ albumId, formData });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.UpdateAlbum(validation.variables);
  if (result.errors) return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
};

const EditAlbum = (): ReactElement => {
  const action = useActionData<ActionData>();
  const location = useLocation();

  return (
    <TabsContent value={location.pathname}>
      <EditAlbumForm errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </TabsContent>
  );
};

export default EditAlbum;
