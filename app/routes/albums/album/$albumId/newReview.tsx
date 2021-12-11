import { ReactElement } from "react";
import { ActionFunction, redirect, useActionData } from "remix";
import { authenticator, loginRedirect } from "~/api/auth.server";
import { FetcherActionData, graphqlSdk } from "~/api/fetcher.server";
import { ErrorsList } from "~/components";
import {
  NewReviewForm,
  NewReviewFormResult,
  validateNewReview,
} from "~/molecules/reviews";
import { json, useRouteTransition } from "~/utils/remix";
import { routes } from "~/utils/routes";
import { isNumber } from "~/utils/validation";

type ActionData = FetcherActionData & {
  errors?: NewReviewFormResult["errors"];
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!isNumber(params.albumId))
    throw new Response("Not Found", { status: 404 });

  const user = await authenticator.isAuthenticated(request);
  if (!user) return loginRedirect(request);

  const albumId = Number(params.albumId);
  const formData = await request.formData();
  const validation = validateNewReview({
    formData,
    albumId,
    profileId: user.profileId,
  });

  if (validation.errors) return json<ActionData>({ errors: validation.errors });

  const result = await graphqlSdk.InsertReview(validation.variables);

  if (result.errors) return json<ActionData>({ fetcherErrors: result.errors });
  return redirect(routes.album(albumId));
};

const NewReview = (): ReactElement => {
  const action = useActionData<ActionData>();
  const transition = useRouteTransition();

  return (
    <>
      <NewReviewForm transition={transition} errors={action?.errors} />
      <ErrorsList errors={action?.fetcherErrors} />
    </>
  );
};

export default NewReview;
