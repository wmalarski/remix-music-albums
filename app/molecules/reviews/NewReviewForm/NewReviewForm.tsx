import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { FetcherError } from "~/api/fetcher";
import { validateNewReview } from "..";
import { NewReviewFormResult } from "./NewReviewForm.utils";

type NewReviewFormProps = {
  fetcherErrors?: FetcherError[];
  transition: Transition;
  validationErrors?: NewReviewFormResult["errors"];
};

export const NewReviewForm = ({
  validationErrors,
  transition,
}: NewReviewFormProps): ReactElement => {
  return (
    <Form method="post">
      <p>
        <label>
          Text: {validationErrors?.text && <em>Text is required</em>}
          <input type="text" name="text" />
        </label>
      </p>
      <p>
        <label>
          Rate: {validationErrors?.rate && <em>Rate is required</em>}
          <input type="number" name="rate" />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Review"}
        </button>
      </p>
    </Form>
  );
};

NewReviewForm.validate = validateNewReview;
