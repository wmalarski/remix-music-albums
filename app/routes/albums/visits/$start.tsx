import { ReactElement } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Heading } from "~/components";
import { NavigationDialog } from "~/modules/layout";
import { VisitsScroll } from "~/modules/visits";
import { graphqlSdk } from "~/services/fetcher.server";
import { SelectVisitsQuery } from "~/services/types.server";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { scrollConfig } from "~/utils/scroll";
import { toNumber } from "~/utils/validation";

export const loader: LoaderFunction = async ({ params }) => {
  const result = await graphqlSdk.SelectVisits({
    limit: scrollConfig.limit,
    offset: toNumber(params.start, 0),
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
    <NavigationDialog to={routes.albums} header={<Heading>Visits</Heading>}>
      <VisitsScroll query={query} />
    </NavigationDialog>
  );
};

export default Visits;