import { Cross1Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useTransition } from "remix";
import { fetcher, FetcherPayload } from "~/api/fetcher";
import {
  SelectVisits,
  SelectVisitsQuery,
  SelectVisitsQueryVariables,
} from "~/api/types";
import { Dialog, Heading } from "~/components";
import { VisitsList } from "~/molecules/visits";
import { routes } from "~/utils/routes";
import { toNumber } from "~/utils/validation";

export const loader: LoaderFunction = ({ params }) => {
  const limit = toNumber(params.visitLimit, 12);
  const offset = toNumber(params.visitOffset, 0);

  return fetcher<SelectVisitsQueryVariables>(SelectVisits, { limit, offset });
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
