import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { graphqlSdk } from "~/api/fetcher";
import { SelectVisitsQuery } from "~/api/types";
import { Dialog, Heading } from "~/components";
import { VisitsList } from "~/molecules/visits";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { toNumber } from "~/utils/validation";

export const handle: HandleFunction = () => {
  return { route: "visits" };
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.visitLimit, 12);
  const offset = toNumber(params.visitOffset, 0);

  const result = await graphqlSdk.SelectVisits({ limit, offset });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectVisitsQuery>(
    result.data ?? { visit: [], visit_aggregate: {} }
  );
};

const Visits = (): ReactElement => {
  const query = useLoaderData<SelectVisitsQuery>();
  const transition = useRouteTransition();

  return (
    <Dialog>
      <Heading>Visits</Heading>
      <VisitsList visits={query.visit} transition={transition} />
      <Dialog.Close to={routes.albums}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Visits;
