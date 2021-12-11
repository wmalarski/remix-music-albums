import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types.server";
import { ErrorsList } from "~/components";
import {
  EditReviewForm,
  EditReviewFormResult,
  validateEditReview,
} from "~/molecules/reviews";
import { HandleFunction, json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: EditReviewFormResult["errors"];
};

export const handle: HandleFunction = () => {
  return { route: "editReview" };
};

export const action: ActionFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  if (!isNumber(params.reviewId) || !isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const albumId = Number(params.albumId);
  const reviewId = Number(params.reviewId);
  const formData = await request.formData();
  const validation = validateEditReview({ reviewId, formData });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.UpdateReview(validation.variables);
  if (result.errors) return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.reviewId))
    throw new Response("Review Not Found", { status: 404 });

  const reviewId = Number(params.reviewId);
  const result = await graphqlSdk.SelectReview({ id: reviewId });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  const reviewFragment = result.data?.reviewByPk;
  if (!reviewFragment) throw new Response("Review Not Found", { status: 404 });

  return json<ReviewWithAlbumAndArtistFragment>(reviewFragment);
};

const EditReview = (): ReactElement => {
  const review = useLoaderData<ReviewWithAlbumAndArtistFragment>();
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <EditReviewForm
        transition={transition}
        errors={action?.errors}
        review={review}
      />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default EditReview;
