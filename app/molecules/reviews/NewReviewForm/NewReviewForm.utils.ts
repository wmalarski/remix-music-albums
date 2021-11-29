import invariant from "tiny-invariant";
import { InsertReviewMutationVariables } from "~/api/types";

export type NewReviewFormResult =
  | {
      variables?: never;
      errors: {
        text?: boolean;
        rate?: boolean;
      };
    }
  | {
      variables: InsertReviewMutationVariables;
      errors?: never;
    };

type ValidateNewReviewArgs = {
  formData: FormData;
  albumId: number;
  profileId: number;
};

export const validateNewReview = ({
  formData,
  albumId,
  profileId,
}: ValidateNewReviewArgs): NewReviewFormResult => {
  const text = formData.get("text");
  const rate = formData.get("rate");

  const errors = {
    text: !text,
    rate: !rate || !/^\d+$/.test(rate.toString()),
  };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof text === "string");

  return {
    variables: { review: { album: albumId, profile: profileId, rate, text } },
  };
};
