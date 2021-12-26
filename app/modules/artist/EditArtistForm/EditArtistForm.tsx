import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, Grid, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { useArtistRoot } from "../ArtistRoot/ArtistRoot";
import { EditArtistFormResult } from "./EditArtistForm.utils";

type Props = {
  errors: EditArtistFormResult["errors"];
};

export const EditArtistForm = ({ errors }: Props): ReactElement => {
  const artist = useArtistRoot();

  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Flex direction="column" gap="md">
        <Grid form>
          <label htmlFor="name">Name:</label>
          <TextInput
            id="name"
            type="text"
            name="name"
            defaultValue={artist.name}
          />
        </Grid>
        {errors?.name && <em>Name is required</em>}
        <Button type="submit">
          {transition.submission ? "Saving..." : "Save Artist"}
        </Button>
      </Flex>
    </Form>
  );
};
