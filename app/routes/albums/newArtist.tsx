import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  ErrorsList,
  Flex,
} from "~/components";
import {
  NewArtistForm,
  NewArtistFormResult,
  validateNewArtist,
} from "~/molecules/artists";
import { json, useIsOpen } from "~/utils/remix";
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

  const { isOpen, onClose, onOpen } = useIsOpen(routes.albums);

  return (
    <>
      <DialogRoot open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <Flex direction="column">
            <DialogHeader onClose={onClose}>New artists</DialogHeader>
            <NewArtistForm errors={action?.errors} />
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewArtist;
