import invariant from "tiny-invariant";
import { InsertReviewMutationVariables } from "~/api/types";

export type NewReviewFormResult = {
  variables?: InsertReviewMutationVariables;
  errors?: {
    text?: boolean;
    rate?: boolean;
  };
};

type ValidateNewReviewArgs = {
  formData: FormData;
  album: number;
  profile: number;
};

export const validateNewReview = ({
  formData,
  album,
  profile,
}: ValidateNewReviewArgs): NewReviewFormResult => {
  const text = formData.get("text");
  const rate = formData.get("rate");

  const errors = {
    text: !text,
    rate: !rate || !/^\d+$/.test(rate.toString()),
  };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof text === "string");

  return { variables: { review: { album, profile, rate, text } } };
};
