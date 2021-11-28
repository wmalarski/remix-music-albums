import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useTransition } from "remix";
import { fetcher, FetcherPayload } from "~/api/fetcher";
import {
  GetVisits,
  GetVisitsQuery,
  GetVisitsQueryVariables,
} from "~/api/types";
import { VisitsList } from "~/molecules/visits";
import { toNumber } from "~/utils/validation";

export const loader: LoaderFunction = ({ params }) => {
  const limit = toNumber(params.visitLimit, 12);
  const offset = toNumber(params.visitOffset, 0);

  return fetcher<GetVisitsQueryVariables>(GetVisits, { limit, offset });
};

const Visits = (): ReactElement => {
  const action = useLoaderData<FetcherPayload<GetVisitsQuery>>();
  const transition = useTransition();

  return (
    <div>
      <p>Visits</p>
      <VisitsList visits={action?.data?.visit} transition={transition} />
    </div>
  );
};

export default Visits;
