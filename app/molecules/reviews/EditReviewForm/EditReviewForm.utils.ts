import invariant from "tiny-invariant";
import { UpdateReviewMutationVariables } from "~/api/types";

export type EditReviewFormResult =
  | {
      variables?: never;
      errors: {
        text?: boolean;
        rate?: boolean;
      };
    }
  | {
      variables: UpdateReviewMutationVariables;
      errors?: never;
    };

type ValidateEditReviewArgs = {
  formData: FormData;
  reviewId: number;
};

export const validateEditReview = ({
  formData,
  reviewId,
}: ValidateEditReviewArgs): EditReviewFormResult => {
  const text = formData.get("text");
  const rate = formData.get("rate");

  const errors = {
    text: !text,
    rate: !rate || !/^\d+$/.test(rate.toString()),
  };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof text === "string");

  return {
    variables: { id: reviewId, input: { text, rate: Number(rate) } },
  };
};
