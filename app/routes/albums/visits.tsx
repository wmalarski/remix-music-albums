import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useTransition } from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  GetVisits,
  GetVisitsQuery,
  GetVisitsQueryVariables,
  VisitWithAlbumAndArtistFragment,
} from "~/api/types";
import { VisitsList } from "~/molecules/visits";
import { toNumber } from "~/utils/validation";

type VisitsActionData = {
  visits?: VisitWithAlbumAndArtistFragment[];
  errors?: FetcherError[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.visitLimit, 12);
  const offset = toNumber(params.visitOffset, 0);

  const payload = await jsonFetcher<GetVisitsQuery, GetVisitsQueryVariables>(
    GetVisits,
    { limit, offset }
  );

  return { visits: payload.data?.visit, errors: payload.errors };
};

const Visits = (): ReactElement => {
  const action = useLoaderData<VisitsActionData>();
  const transition = useTransition();

  return (
    <div>
      <p>Visits</p>
      <VisitsList visits={action?.visits} transition={transition} />
    </div>
  );
};

export default Visits;
