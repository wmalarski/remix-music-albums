import { Transition } from "@remix-run/react/transition";
import { ReactElement } from "react";
import { Form } from "remix";
import { Button, TextInput } from "~/components";
import { NewArtistFormResult } from "./NewArtistForm.utils";

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
      <label>
        Name: {errors?.name && <em>Name is required</em>}
        <TextInput type="text" name="name" />
      </label>
      <label>
        Sid: {errors?.sid && <em>Sid is required</em>}
        <TextInput type="text" name="sid" />
      </label>
      <Button type="submit">
        {transition.submission ? "Creating..." : "Create Artist"}
      </Button>
    </Form>
  );
};
