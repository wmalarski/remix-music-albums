import invariant from "tiny-invariant";
import {
  InsertAlbumMutationVariables,
  InsertArtistMutationVariables,
  InsertReviewMutationVariables,
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

  const validationErrors = { name: !name, sid: !sid };
  if (Object.values(validationErrors).includes(true))
    return { validationErrors };

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

  const validationErrors = {
    title: !title,
    sid: !sid,
    year: !year || !/^\d+$/.test(year.toString()),
  };
  if (Object.values(validationErrors).includes(true))
    return { validationErrors };

  invariant(typeof title === "string");
  invariant(typeof sid === "string");

  return { variables: { album: { title, artist, year: Number(year), sid } } };
};

export type ValidateNewReviewResult = {
  variables?: InsertReviewMutationVariables;
  validationErrors?: {
    text?: boolean;
    rate?: boolean;
  };
};

export const validateNewReview = (
  formData: FormData,
  album: number,
  profile: number
): ValidateNewReviewResult => {
  const text = formData.get("text");
  const rate = formData.get("rate");

  const validationErrors = {
    text: !text,
    rate: !rate || !/^\d+$/.test(rate.toString()),
  };
  if (Object.values(validationErrors).includes(true))
    return { validationErrors };

  invariant(typeof text === "string");

  return { variables: { review: { album, profile, rate, text } } };
};
