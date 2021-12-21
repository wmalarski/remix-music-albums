import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useLocation } from "remix";
import { ErrorsList, TabsContent } from "~/components";
import {
  EditArtistForm,
  EditArtistFormResult,
  validateEditArtist,
} from "~/modules/artists";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: EditArtistFormResult["errors"];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);
  const formData = await request.formData();
  const validation = validateEditArtist({ formData, artistId });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const result = await graphqlSdk.UpdateArtist(validation.variables);

  if (result.errors) return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.artist(artistId));
};

const EditAlbum = (): ReactElement => {
  const action = useActionData<ActionData>();
  const location = useLocation();

  return (
    <TabsContent value={location.pathname}>
      <EditArtistForm errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </TabsContent>
  );
};

export default EditAlbum;
