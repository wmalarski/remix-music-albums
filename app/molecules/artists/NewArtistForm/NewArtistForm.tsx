import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { FetcherError } from "~/api/fetcher";
import { TextInput } from "~/components";
import { NewArtistFormResult, validateNewArtist } from "./NewArtistForm.utils";

type NewArtistFormProps = {
  validationErrors: NewArtistFormResult["errors"];
  transition: Transition;
  fetcherErrors?: FetcherError[];
};

export const NewArtistForm = ({
  validationErrors,
  transition,
}: NewArtistFormProps): ReactElement => {
  return (
    <Form method="post">
      <p>
        <label>
          Name: {validationErrors?.name && <em>Name is required</em>}
          <TextInput type="text" name="name" />
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
          {transition.submission ? "Creating..." : "Create Artist"}
        </button>
      </p>
    </Form>
  );
};

NewArtistForm.validate = validateNewArtist;
