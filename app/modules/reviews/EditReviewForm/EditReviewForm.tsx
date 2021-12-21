import { ReactElement } from "react";
import { Form } from "remix";
import { ReviewWithAlbumAndArtistFragment } from "~/api/types.server";
import { Button, Heading, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { EditReviewFormResult } from "./EditReviewForm.utils";

type Props = {
  errors?: EditReviewFormResult["errors"];
  review: ReviewWithAlbumAndArtistFragment;
};

export const EditReviewForm = ({ errors, review }: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Heading>Edit review</Heading>
      <label>
        Text: {errors?.text && <em>Text is required</em>}
        <TextInput type="text" name="text" defaultValue={review.text} />
      </label>
      <label>
        Rate: {errors?.rate && <em>Rate is required</em>}
        <input type="number" name="rate" defaultValue={review.rate} />
      </label>
      <Button type="submit">
        {transition?.submission ? "Saving..." : "Save Review"}
      </Button>
    </Form>
  );
};
