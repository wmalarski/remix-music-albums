import { ReactElement } from "react";
import { ActionFunction, Form, useActionData, useTransition } from "remix";
import invariant from "tiny-invariant";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertAlbum,
  InsertReviewMutation,
  InsertReviewMutationVariables,
} from "~/api/types";
import { validateNewReview, ValidateNewReviewResult } from "~/api/validators";

type NewReviewActionData = ValidateNewReviewResult & {
  reviewId?: number;
  fetcherErrors?: FetcherError[];
};

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.albumId, "expected params.albumId");
  invariant(/^\d+$/.test(params.albumId), "params.albumId not number");

  const profile = 1; // TODO add profiles
  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const { variables, validationErrors } = validateNewReview(
    formData,
    albumId,
    profile
  );

  if (validationErrors) return { validationErrors };

  const result = await jsonFetcher<
    InsertReviewMutation,
    InsertReviewMutationVariables
  >(InsertAlbum, variables);

  const reviewId = result.data?.insert_review_one?.id;

  return { reviewId, fetcherErrors: result.errors };
};

const NewAlbum = (): ReactElement => {
  const action = useActionData<NewReviewActionData>();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Text: {action?.validationErrors?.text && <em>Text is required</em>}
          <input type="text" name="text" />
        </label>
      </p>
      <p>
        <label>
          Rate: {action?.validationErrors?.rate && <em>Rate is required</em>}
          <input type="number" name="rate" />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Review"}
        </button>
      </p>
    </Form>
  );
};

export default NewAlbum;
