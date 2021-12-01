import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Heading, TextInput } from "~/components";
import { NewReviewFormResult } from "./NewReviewForm.utils";

type NewReviewFormProps = {
  transition?: Transition;
  errors?: NewReviewFormResult["errors"];
};

export const NewReviewForm = ({
  errors,
  transition,
}: NewReviewFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>Review album</Heading>
      <label>
        Text: {errors?.text && <em>Text is required</em>}
        <TextInput type="text" name="text" />
      </label>
      <label>
        Rate: {errors?.rate && <em>Rate is required</em>}
        <input type="number" name="rate" />
      </label>
      <Button type="submit">
        {transition?.submission ? "Creating..." : "Create Review"}
      </Button>
    </Form>
  );
};
