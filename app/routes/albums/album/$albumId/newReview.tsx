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
  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const { variables, errors } = validateNewReview(formData, albumId, profile);

  if (errors) return json({ errors });

  const result = await jsonFetcher<
    InsertReviewMutation,
    InsertReviewMutationVariables
  >(InsertReview, variables);

  if (result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
};

const NewReview = (): ReactElement => {
  const action = useActionData<NewReviewActionData>();
  const transition = useTransition();

  return (
    <NewReviewForm transition={transition} validationErrors={action?.errors} />
  );
};

export default NewReview;
