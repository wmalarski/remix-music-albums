import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { ArtistWithAlbumsFragment } from "~/api/types";
import { Heading, TextInput } from "~/components";
import { EditArtistFormResult } from "./EditArtistForm.utils";

type EditArtistFormProps = {
  errors: EditArtistFormResult["errors"];
  transition: Transition;
  artist: ArtistWithAlbumsFragment;
};

export const EditArtistForm = ({
  artist,
  errors,
  transition,
}: EditArtistFormProps): ReactElement => {
  return (
    <Form method="post">
      <Heading>Edit Artist</Heading>
      <p>
        <label>
          Name: {errors?.name && <em>Name is required</em>}
          <TextInput type="text" name="name" defaultValue={artist.name} />
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
