import { ReactElement } from "react";
import {
  ActionFunction,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
  useLocation,
} from "remix";
import { ErrorsList, TabsContent } from "~/components";
import {
  EditReviewForm,
  EditReviewFormResult,
  validateEditReview,
} from "~/modules/reviews";
import { authenticator, loginRedirect } from "~/services/auth.server";
import { FetcherActionData, graphqlSdk } from "~/services/fetcher.server";
import { ReviewWithAlbumAndArtistFragment } from "~/services/types.server";
import { json } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: EditReviewFormResult["errors"];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.reviewId) || !isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const albumId = Number(params.albumId);
  const reviewId = Number(params.reviewId);
  const formData = await request.formData();
  const validation = validateEditReview({ reviewId, formData });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

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
  const location = useLocation();

  return (
    <TabsContent value={location.pathname}>
      <EditReviewForm errors={action?.errors} review={review} />
      <ErrorsList errors={action?.fetcherErrors} />
    </TabsContent>
  );
};

export default EditReview;
