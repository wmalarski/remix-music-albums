import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Heading, TextInput } from "~/components";
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
      <Heading>Edit Album</Heading>
      <label>
        Title: {errors?.title && <em>Title is required</em>}
        <TextInput type="text" name="title" defaultValue={album?.title} />
      </label>
      <label>
        Year: {errors?.year && <em>Year is required</em>}
        <input type="number" name="year" defaultValue={album?.year} />
      </label>
      <Button type="submit">
        {transition.submission ? "Saving..." : "Save Album"}
      </Button>
    </Form>
  );
};
