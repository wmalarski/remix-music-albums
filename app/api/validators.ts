import invariant from "tiny-invariant";
import {
  InsertAlbumMutationVariables,
  InsertArtistMutationVariables,
} from "./types";

export type ValidateNewArtistResult = {
  variables?: InsertArtistMutationVariables;
  validationErrors?: {
    name?: boolean;
    sid?: boolean;
  };
};

export const validateNewArtist = (
  formData: FormData
): ValidateNewArtistResult => {
  const name = formData.get("name");
  const sid = formData.get("sid");

  const errors = { name: !name, sid: !sid };
  if (Object.values(errors).includes(true)) return { validationErrors: errors };

  invariant(typeof name === "string");
  invariant(typeof sid === "string");

  return { variables: { artist: { name, sid } } };
};

export type ValidateNewAlbumResult = {
  variables?: InsertAlbumMutationVariables;
  validationErrors?: {
    title?: boolean;
    sid?: boolean;
    year?: boolean;
  };
};

export const validateNewAlbum = (
  formData: FormData,
  artist: number
): ValidateNewAlbumResult => {
  const title = formData.get("title");
  const sid = formData.get("sid");
  const year = formData.get("year");

  const errors = {
    title: !title,
    sid: !sid,
    year: !year || !/^\d+$/.test(year.toString()),
  };
  if (Object.values(errors).includes(true)) return { validationErrors: errors };

  invariant(typeof title === "string");
  invariant(typeof sid === "string");

  return { variables: { album: { title, artist, year: Number(year), sid } } };
};
