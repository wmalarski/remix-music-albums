import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Heading, TextInput } from "~/components";
import { EditArtistFormResult } from "./EditArtistForm.utils";

type EditArtistFormProps = {
  errors: EditArtistFormResult["errors"];
  transition: Transition;
};

export const EditArtistForm = ({
  errors,
  transition,
}: EditArtistFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>Edit Artist</Heading>
      <p>
        <label>
          Name: {errors?.name && <em>Name is required</em>}
          <TextInput type="text" name="name" />
        </label>
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Saving..." : "Save Artist"}
        </button>
      </p>
    </Form>
  );
};
