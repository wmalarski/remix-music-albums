import invariant from "tiny-invariant";
import { UpdateArtistMutationVariables } from "~/api/types";

export type EditArtistFormResult = {
  variables?: UpdateArtistMutationVariables;
  errors?: {
    name?: boolean;
  };
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
