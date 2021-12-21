import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Heading, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { NewReviewFormResult } from "./NewReviewForm.utils";

type Props = {
  errors?: NewReviewFormResult["errors"];
};

export const NewReviewForm = ({ errors }: Props): ReactElement => {
  const transition = useRouteTransition();

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
