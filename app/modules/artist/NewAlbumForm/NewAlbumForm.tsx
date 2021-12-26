import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, Grid, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { NewAlbumFormResult } from "./NewAlbumForm.utils";

type Props = {
  errors: NewAlbumFormResult["errors"];
};

export const NewAlbumForm = ({ errors }: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Flex direction="column" gap="md">
        <Grid form>
          <label htmlFor="title">Title:</label>
          <TextInput id="title" type="text" name="title" />
          <label htmlFor="year">Year:</label>
          <TextInput
            id="year"
            type="number"
            name="year"
            min={1900}
            max={2050}
          />
          <label htmlFor="mBid">mBid:</label>
          <TextInput id="mBid" type="text" name="sid" />
        </Grid>
        {errors?.title && <em>Title is required</em>}
        {errors?.year && <em>Year is required</em>}
        {errors?.sid && <em>mBid is required</em>}
        <Button type="submit">
          {transition.submission ? "Creating..." : "Create Album"}
        </Button>
      </Flex>
    </Form>
  );
};
