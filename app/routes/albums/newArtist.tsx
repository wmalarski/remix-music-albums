import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher";
import { Dialog, ErrorsList } from "~/components";
import {
  NewArtistForm,
  NewArtistFormResult,
  validateNewArtist,
} from "~/molecules/artists";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";

type ActionData = FetcherActionData & {
  errors?: NewArtistFormResult["errors"];
};

export const handle: HandleFunction = () => {
  return { route: "newArtist" };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const validation = validateNewArtist(formData);

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.InsertArtist(validation.variables);

  const id = result.data?.insert_artist_one?.id;
  if (!id || result.errors)
    return json<ActionData>({ fetcherErrors: result.errors });

  return redirect(routes.artist(id));
};

const NewArtist = (): ReactElement => {
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <Dialog>
        <NewArtistForm transition={transition} errors={action?.errors} />
        <Dialog.Close to={routes.albums}>
          <Cross1Icon />
        </Dialog.Close>
      </Dialog>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewArtist;
