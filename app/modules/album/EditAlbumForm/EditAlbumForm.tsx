import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Flex, Grid, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { useAlbumRoot } from "..";
import { EditAlbumFormResult } from "./EditAlbumForm.utils";

type Props = {
  errors: EditAlbumFormResult["errors"];
};

export const EditAlbumForm = ({ errors }: Props): ReactElement => {
  const album = useAlbumRoot();

  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Flex direction="column" gap="md">
        <Grid form>
          <label htmlFor="title">Title:</label>
          <TextInput
            id="title"
            type="text"
            name="title"
            defaultValue={album?.title}
          />
          <label htmlFor="year">Year:</label>
          <TextInput
            id="year"
            type="number"
            min={1900}
            max={2050}
            name="year"
            defaultValue={album?.year}
          />
        </Grid>
        {errors?.title && <em>Title is required</em>}
        {errors?.year && <em>Year is required</em>}
        <Button type="submit">
          {transition.submission ? "Saving..." : "Save Album"}
        </Button>
      </Flex>
    </Form>
  );
};
