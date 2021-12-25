import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { ErrorsList, Heading } from "~/components";
import {
  NewArtistForm,
  NewArtistFormResult,
  validateNewArtist,
} from "~/modules/artists";
import { NavigationDialog } from "~/modules/layout";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";

type ActionData = FetcherActionData & {
  errors?: NewArtistFormResult["errors"];
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const formData = await request.formData();
  const validation = validateNewArtist(formData);

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.InsertArtist(validation.variables);

  const id = result.data?.insertArtistOne?.id;
  if (!id || result.errors)
    return json<ActionData>({ fetcherErrors: result.errors });

  return redirect(routes.artist(id));
};

const NewArtist = (): ReactElement => {
  const action = useActionData<ActionData>();

  return (
    <>
      <NavigationDialog
        to={routes.albums}
        header={<Heading>New Artist</Heading>}
      >
        <NewArtistForm errors={action?.errors} />
      </NavigationDialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewArtist;
