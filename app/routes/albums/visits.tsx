import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { json, LoaderFunction, useLoaderData, useTransition } from "remix";
import { FetcherPayload, jsonFetcher } from "~/api/fetcher";
import {
  SelectVisits,
  SelectVisitsQuery,
  SelectVisitsQueryVariables,
} from "~/api/types";
import { Dialog, Heading } from "~/components";
import { VisitsList } from "~/molecules/visits";
import { routes } from "~/utils/routes";
import { toNumber } from "~/utils/validation";

export const loader: LoaderFunction = async ({ params }) => {
  const limit = toNumber(params.visitLimit, 12);
  const offset = toNumber(params.visitOffset, 0);

  const result = await jsonFetcher<
    SelectVisitsQuery,
    SelectVisitsQueryVariables
  >(SelectVisits, { limit, offset });

  console.log("visits", JSON.stringify(result, null, 2));

  return json(result);
};

const Visits = (): ReactElement => {
  const action = useLoaderData<FetcherPayload<SelectVisitsQuery>>();
  const transition = useTransition();

  return (
    <Dialog>
      <Heading>Visits</Heading>
      <VisitsList visits={action?.data?.visit} transition={transition} />
      <Dialog.Close to={routes.albums()}>
        <Cross1Icon />
      </Dialog.Close>
    </Dialog>
  );
};

export default Visits;
