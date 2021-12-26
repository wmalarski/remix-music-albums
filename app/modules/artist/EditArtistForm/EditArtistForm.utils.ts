import invariant from "tiny-invariant";
import { UpdateArtistMutationVariables } from "~/services/types.server";

export type EditArtistFormResult =
  | {
      variables?: never;
      errors: {
        name?: boolean;
      };
    }
  | {
      variables: UpdateArtistMutationVariables;
      errors?: never;
    };

type ValidateEditArtistArgs = {
  formData: FormData;
  artistId: number;
};

export const validateEditArtist = ({
  formData,
  artistId,
}: ValidateEditArtistArgs): EditArtistFormResult => {
  const name = formData.get("name");

  const errors = { name: !name };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof name === "string");

  return { variables: { id: artistId, input: { name } } };
};
