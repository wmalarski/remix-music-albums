import invariant from "tiny-invariant";
import { InsertAlbumMutationVariables } from "~/api/types";

export type NewAlbumFormResult =
  | {
      variables?: never;
      errors: {
        title?: boolean;
        sid?: boolean;
        year?: boolean;
      };
    }
  | {
      variables: InsertAlbumMutationVariables;
      errors?: never;
    };

export const validateNewAlbum = (
  formData: FormData,
  artist: number
): NewAlbumFormResult => {
  const title = formData.get("title");
  const sid = formData.get("sid");
  const year = formData.get("year");

  const errors = {
    title: !title,
    sid: !sid,
    year: !year || !/^\d+$/.test(year.toString()),
  };
  if (Object.values(errors).includes(true)) return { errors };

  invariant(typeof title === "string");
  invariant(typeof sid === "string");

  return { variables: { album: { title, artist, year: Number(year), sid } } };
};
