import { ReactElement } from "react";
import {
  ActionFunction,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertReview,
  InsertReviewMutation,
  InsertReviewMutationVariables,
} from "~/api/types";
import { ErrorsList } from "~/components";
import {
  NewReviewForm,
  NewReviewFormResult,
  validateNewReview,
} from "~/molecules/reviews";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type NewReviewActionData = {
  errors?: NewReviewFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const profile = 1; // TODO add profiles
  const album = Number(params.albumId);
  const formData = await request.formData();
  const { variables, errors } = validateNewReview({
    formData,
    album,
    profile,
  });

  if (errors) return json({ errors });

  const result = await jsonFetcher<
    InsertReviewMutation,
    InsertReviewMutationVariables
  >(InsertReview, variables);

  if (result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(album));
};

const NewReview = (): ReactElement => {
  const action = useActionData<NewReviewActionData>();
  const transition = useTransition();

  return (
    <>
      <NewReviewForm transition={transition} errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewReview;
