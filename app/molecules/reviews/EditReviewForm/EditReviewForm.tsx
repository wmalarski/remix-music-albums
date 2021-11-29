import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types";
import { Heading, TextInput } from "~/components";
import { EditReviewFormResult } from "./EditReviewForm.utils";

type EditReviewFormProps = {
  transition?: Transition;
  errors?: EditReviewFormResult["errors"];
  review: ReviewWithAlbumAndArtistFragment;
};

export const EditReviewForm = ({
  errors,
  transition,
  review,
}: EditReviewFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>Edit review</Heading>
      <p>
        <label>
          Text: {errors?.text && <em>Text is required</em>}
          <TextInput type="text" name="text" defaultValue={review.text} />
        </label>
      </p>
      <p>
        <label>
          Rate: {errors?.rate && <em>Rate is required</em>}
          <input type="number" name="rate" defaultValue={review.rate} />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition?.submission ? "Saving..." : "Save Review"}
        </button>
      </p>
    </Form>
  );
};
