import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData, useTransition } from "remix";
import { FetcherError, jsonFetcher } from "~/api/fetcher";
import {
  InsertAlbum,
  InsertReviewMutation,
  InsertReviewMutationVariables,
} from "~/api/types";
import { NewReviewForm, NewReviewFormResult } from "~/molecules/reviews";
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

  if (result.errors) return { fetcherErrors: result.errors };

  return redirect(routes.album(albumId).toString());
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
