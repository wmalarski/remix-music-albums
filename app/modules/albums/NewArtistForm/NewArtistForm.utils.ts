import invariant from "tiny-invariant";
import { InsertArtistMutationVariables } from "~/services/types.server";

export type NewArtistFormResult =
  | {
      variables?: never;
      errors: {
        name?: boolean;
        sid?: boolean;
      };
    }
  | {
      variables: InsertArtistMutationVariables;
      errors?: never;
    };

export const validateNewArtist = (formData: FormData): NewArtistFormResult => {
  const name = formData.get("name");
  const sid = formData.get("sid");

  const errors = { name: !name, sid: !sid };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof name === "string");
  invariant(typeof sid === "string");

  return { variables: { artist: { name: name, sid } } };
};
