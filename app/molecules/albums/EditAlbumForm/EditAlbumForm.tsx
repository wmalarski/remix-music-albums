import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { AlbumFragment } from "~/api/types";
import { Heading, TextInput } from "~/components";
import { EditAlbumFormResult } from "./EditAlbumForm.utils";

type EditAlbumFormProps = {
  transition: Transition;
  errors: EditAlbumFormResult["errors"];
  album?: AlbumFragment | null;
};

export const EditAlbumForm = ({
  transition,
  errors,
  album,
}: EditAlbumFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>Edit Album</Heading>
      <p>
        <label>
          Title: {errors?.title && <em>Title is required</em>}
          <TextInput type="text" name="title" defaultValue={album?.title} />
        </label>
      </p>
      <p>
        <label>
          Year: {errors?.year && <em>Year is required</em>}
          <input type="number" name="year" defaultValue={album?.year} />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Saving..." : "Save Album"}
        </button>
      </p>
    </Form>
  );
};
