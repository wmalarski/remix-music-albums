import { ReactElement } from "react";
import { Form } from "remix";
import { Button, Heading, TextInput } from "~/components";
import { useRouteTransition } from "~/utils/remix";
import { NewAlbumFormResult } from "./NewAlbumForm.utils";

type Props = {
  errors: NewAlbumFormResult["errors"];
};

export const NewAlbumForm = ({ errors }: Props): ReactElement => {
  const transition = useRouteTransition();

  return (
    <Form method="post">
      <Heading>New Album</Heading>
      <label>
        Title: {errors?.title && <em>Title is required</em>}
        <TextInput type="text" name="title" />
      </label>
      <label>
        Year: {errors?.year && <em>Year is required</em>}
        <input type="number" name="year" />
      </label>
      <label>
        Sid: {errors?.sid && <em>Sid is required</em>}
        <TextInput type="text" name="sid" />
      </label>
      <Button type="submit">
        {transition.submission ? "Creating..." : "Create Album"}
      </Button>
    </Form>
  );
};
