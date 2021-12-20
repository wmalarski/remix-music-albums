import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { SelectReviewsQuery } from "~/api/types.server";
import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  ErrorsList,
  Flex,
} from "~/components";
import { ReviewScroll } from "~/molecules/reviews";
import { json, useIsOpen } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { getRequestStart, scrollConfig } from "~/utils/scroll";
import { isNumber } from "~/utils/validation";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const reviewId = formData.get("reviewId")?.toString();

  if (!isNumber(reviewId)) throw new Response("Not Found", { status: 404 });

  const result = await graphqlSdk.DeleteReview({ id: Number(reviewId) });

  const album = result.data?.deleteReviewByPk?.album;
  if (!album || result.errors)
    return json<FetcherActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

export const loader: LoaderFunction = async ({ request }) => {
  const start = getRequestStart(request);

  const result = await graphqlSdk.SelectReviews({
    limit: scrollConfig.limit,
    offset: start,
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectReviewsQuery>(
    result.data ?? { review: [], reviewAggregate: {} }
  );
};

const Reviews = (): ReactElement => {
  const action = useActionData<FetcherActionData>();
  const query = useLoaderData<SelectReviewsQuery>();

  const { isOpen, onClose, onOpen } = useIsOpen(routes.albums);

  return (
    <>
      <DialogRoot open={isOpen} onOpenChange={onOpen}>
        <DialogContent>
          <Flex direction="column">
            <DialogHeader onClose={onClose}>Reviews</DialogHeader>
            <ReviewScroll query={query} />
          </Flex>
        </DialogContent>
      </DialogRoot>
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default Reviews;
