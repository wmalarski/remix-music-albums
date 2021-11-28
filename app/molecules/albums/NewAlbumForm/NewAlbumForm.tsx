import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Heading, TextInput } from "~/components";
import { NewAlbumFormResult, validateNewAlbum } from "./NewAlbumForm.utils";

type NewAlbumFormProps = {
  transition: Transition;
  errors: NewAlbumFormResult["errors"];
};

export const NewAlbumForm = ({
  transition,
  errors,
}: NewAlbumFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>New Artist</Heading>
      <p>
        <label>
          Title: {errors?.title && <em>Title is required</em>}
          <TextInput type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Year: {errors?.year && <em>Year is required</em>}
          <input type="number" name="year" />
        </label>
      </p>
      <p>
        <label>
          Sid: {errors?.sid && <em>Sid is required</em>}
          <TextInput type="text" name="sid" />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Album"}
        </button>
      </p>
    </Form>
  );
};

NewAlbumForm.validate = validateNewAlbum;
