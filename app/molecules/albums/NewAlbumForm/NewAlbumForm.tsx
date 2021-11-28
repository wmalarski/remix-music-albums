import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { FetcherError } from "~/api/fetcher";
import { Heading, TextInput } from "~/components";
import { NewAlbumFormResult, validateNewAlbum } from "./NewAlbumForm.utils";

type NewAlbumFormProps = {
  fetcherErrors?: FetcherError[];
  transition: Transition;
  validationErrors: NewAlbumFormResult["errors"];
};

export const NewAlbumForm = ({
  transition,
  validationErrors,
}: NewAlbumFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>New Artist</Heading>
      <p>
        <label>
          Title: {validationErrors?.title && <em>Title is required</em>}
          <TextInput type="text" name="title" />
        </label>
      </p>
      <p>
        <label>
          Year: {validationErrors?.year && <em>Year is required</em>}
          <input type="number" name="year" />
        </label>
      </p>
      <p>
        <label>
          Sid: {validationErrors?.sid && <em>Sid is required</em>}
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
