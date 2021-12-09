import { ReactElement, useState } from "react";
import { ActionFunction, redirect, useActionData, useNavigate } from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import {
  DialogContent,
  DialogDescription,
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

  const id = result.data?.insertArtistOne?.id;
  if (!id || result.errors)
    return json<ActionData>({ fetcherErrors: result.errors });

  return redirect(routes.artist(id));
};

const NewArtist = (): ReactElement => {
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const handleCloseClick = () => setIsOpen(false);
  const handleOpenChange = () => navigate(routes.albums);

  return (
    <>
      <DialogRoot open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <Flex direction="column">
            <DialogHeader onClose={handleCloseClick}>New artists</DialogHeader>
            <DialogDescription>
              <NewArtistForm transition={transition} errors={action?.errors} />
            </DialogDescription>
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewArtist;
