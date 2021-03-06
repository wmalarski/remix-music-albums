import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useLocation } from "remix";
import { ErrorsList, TabsContent } from "~/components";
import {
  NewAlbumForm,
  NewAlbumFormResult,
  validateNewAlbum,
} from "~/modules/artist";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { json, notFound } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: NewAlbumFormResult["errors"];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId)) throw notFound();

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

  const location = useLocation();

  return (
    <TabsContent value={location.pathname}>
      <NewAlbumForm errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </TabsContent>
  );
};

export default NewAlbum;
