import { ReactElement } from "react";
import {
  ActionFunction,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { FetcherError, graphqlSdk } from "~/api/fetcher";
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

  const profileId = 1; // TODO add profiles
  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const validation = validateNewReview({
    formData,
    albumId,
    profileId,
  });

  if (validation.errors) return json({ errors: validation.errors });

  const result = await graphqlSdk.InsertReview(validation.variables);

  if (result.errors) return json({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
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
