import { ReactElement } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { graphqlSdk } from "~/api/fetcher.server";
import { SelectVisitsQuery } from "~/api/types.server";
import { DialogContent, DialogHeader, DialogRoot, Flex } from "~/components";
import { VisitsScroll } from "~/molecules/visits";
import { json, useIsOpen } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { getRequestStart, scrollConfig } from "~/utils/scroll";

export const loader: LoaderFunction = async ({ request }) => {
  const start = getRequestStart(request);

  const result = await graphqlSdk.SelectVisits({
    limit: scrollConfig.limit,
    offset: start,
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectVisitsQuery>(
    result.data ?? { visit: [], visitAggregate: {} }
  );
};

const Visits = (): ReactElement => {
  const query = useLoaderData<SelectVisitsQuery>();

  const { isOpen, onClose, onOpen } = useIsOpen(routes.albums);

  return (
    <DialogRoot open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        <Flex direction="column">
          <DialogHeader onClose={onClose}>Visits</DialogHeader>
          <VisitsScroll query={query} />
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};

export default Visits;
