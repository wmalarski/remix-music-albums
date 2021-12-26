import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, Grid, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { NewReviewFormResult } from "./NewReviewForm.utils";

type Props = {
  errors?: NewReviewFormResult["errors"];
};

export const NewReviewForm = ({ errors }: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Flex direction="column" gap="md">
        <Grid form>
          <label htmlFor="text">Text:</label>
          <TextInput id="text" type="text" name="text" />
          <label htmlFor="rate">Rate:</label>
          <TextInput
            id="rate"
            type="number"
            name="rate"
            min={0}
            max={10}
            step={0.1}
          />
        </Grid>
        {errors?.text && <em>Text is required</em>}
        {errors?.rate && <em>Rate is required</em>}
        <Button type="submit">
          {transition?.submission ? "Creating..." : "Create Review"}
        </Button>
      </Flex>
    </Form>
  );
};
