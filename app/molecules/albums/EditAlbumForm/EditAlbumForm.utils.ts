import invariant from "tiny-invariant";
import { UpdateAlbumMutationVariables } from "~/api/types";

export type EditAlbumFormResult =
  | {
      variables?: never;
      errors: {
        title?: boolean;
        year?: boolean;
      };
    }
  | {
      errors?: never;
      variables: UpdateAlbumMutationVariables;
    };

type ValidateEditAlbumArgs = {
  albumId: number;
  formData: FormData;
};

export const validateEditAlbum = ({
  albumId,
  formData,
}: ValidateEditAlbumArgs): EditAlbumFormResult => {
  const title = formData.get("title");
  const year = formData.get("year");

  const errors = {
    title: !title,
    year: !year || !/^\d+$/.test(year.toString()),
  };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof title === "string");

  return {
    variables: {
      id: albumId,
      input: { title, year: Number(year) },
    },
  };
};
