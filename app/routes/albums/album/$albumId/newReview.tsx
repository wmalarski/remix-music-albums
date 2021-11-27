import { ReactElement } from "react";
import { ActionFunction, useActionData, useTransition } from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertAlbum,
  InsertReviewMutation,
  InsertReviewMutationVariables,
} from "~/api/types";
import { NewReviewForm, NewReviewFormResult } from "~/molecules/reviews";

type NewReviewActionData = {
  reviewId?: number;
  errors?: NewReviewFormResult["errors"];
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.albumId || !/^\d+$/.test(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const profile = 1; // TODO add profiles
  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const { variables, errors } = NewReviewForm.validate(
    formData,
    albumId,
    profile
  );

  if (errors) return { errors };

  const result = await jsonFetcher<
    InsertReviewMutation,
    InsertReviewMutationVariables
  >(InsertAlbum, variables);

  const reviewId = result.data?.insert_review_one?.id;

  return { reviewId, fetcherErrors: result.errors };
};

const NewReview = (): ReactElement => {
  const action = useActionData<NewReviewActionData>();
  const transition = useTransition();

  return (
    <NewReviewForm
      transition={transition}
      fetcherErrors={action?.fetcherErrors}
      validationErrors={action?.errors}
    />
  );
};

export default NewReview;
