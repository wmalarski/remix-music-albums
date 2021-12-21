import { ReactElement } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { NavigationDialog } from "~/modules/layout";
import { VisitsScroll } from "~/modules/visits";
import { graphqlSdk } from "~/services/fetcher.server";
import { SelectVisitsQuery } from "~/services/types.server";
import { json } from "~/utils/remix";
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

  return (
    <NavigationDialog to={routes.albums} header="Visits">
      <VisitsScroll query={query} />
    </NavigationDialog>
  );
};

export default Visits;
