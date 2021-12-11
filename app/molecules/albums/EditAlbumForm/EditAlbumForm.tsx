import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Heading, TextInput } from "~/components";
import { useAlbumRoot } from "..";
import { EditAlbumFormResult } from "./EditAlbumForm.utils";

type EditAlbumFormProps = {
  transition: Transition;
  errors: EditAlbumFormResult["errors"];
};

export const EditAlbumForm = ({
  transition,
  errors,
}: EditAlbumFormProps): ReactElement => {
  const album = useAlbumRoot();

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
