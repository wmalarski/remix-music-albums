import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Heading, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { useArtistRoot } from "../ArtistRoot/ArtistRoot";
import { EditArtistFormResult } from "./EditArtistForm.utils";

type Props = {
  errors: EditArtistFormResult["errors"];
};

export const EditArtistForm = ({ errors }: Props): ReactElement => {
  const artist = useArtistRoot();

  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Heading>Edit Artist</Heading>
      <label>
        Name: {errors?.name && <em>Name is required</em>}
        <TextInput type="text" name="name" defaultValue={artist.name} />
      </label>
      <Button type="submit">
        {transition.submission ? "Saving..." : "Save Artist"}
      </Button>
    </Form>
  );
};
