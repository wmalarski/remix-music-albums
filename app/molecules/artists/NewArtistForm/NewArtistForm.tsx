import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Heading, TextInput } from "~/components";
import { NewArtistFormResult, validateNewArtist } from "./NewArtistForm.utils";

type NewArtistFormProps = {
  errors: NewArtistFormResult["errors"];
  transition: Transition;
};

export const NewArtistForm = ({
  errors,
  transition,
}: NewArtistFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>New Artist</Heading>
      <p>
        <label>
          Name: {errors?.name && <em>Name is required</em>}
          <TextInput type="text" name="name" />
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
          {transition.submission ? "Creating..." : "Create Artist"}
        </button>
      </p>
    </Form>
  );
};

NewArtistForm.validate = validateNewArtist;
