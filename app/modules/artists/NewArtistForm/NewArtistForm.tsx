import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, Grid, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { NewArtistFormResult } from "./NewArtistForm.utils";

type Props = {
  errors: NewArtistFormResult["errors"];
};

export const NewArtistForm = ({ errors }: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Flex direction="column" gap="md">
        <Grid form>
          <label htmlFor="name">Name:</label>
          <TextInput id="name" type="text" name="name" />
          <label htmlFor="mBid">mBid</label>
          <TextInput id="mBid" type="text" name="sid" />
        </Grid>
        {errors?.sid && <em>mBid is required</em>}
        {errors?.name && <em>Name is required</em>}
        <Button type="submit">
          {transition.submission ? "Creating..." : "Create Artist"}
        </Button>
      </Flex>
    </Form>
  );
};
