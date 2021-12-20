import { ReactElement } from "react";
import { Form } from "remix";
import { Button, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { NewArtistFormResult } from "./NewArtistForm.utils";

type Props = {
  errors: NewArtistFormResult["errors"];
};

export const NewArtistForm = ({ errors }: Props): ReactElement => {
  const transition = useRouteTransition();

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
