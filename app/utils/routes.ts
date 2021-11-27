import { To } from "react-router";

type PaginationArgs = {
  offset?: number;
};

type PaginationSearchArgs = PaginationArgs & {
  offsetKey: string;
};

const paginationSearch = ({
  offset,
  offsetKey,
}: PaginationSearchArgs): string => (!offset ? "" : `${offsetKey}=${offset}`);

export const routes = {
  home: "/",
  albums: ({ offset }: PaginationArgs = {}): To => ({
    pathname: "/albums",
    search: paginationSearch({ offset, offsetKey: "offset" }),
  }),
  reviews: ({ offset }: PaginationArgs = {}): To => ({
    pathname: "/albums/reviews",
    search: paginationSearch({ offset, offsetKey: "offsetReviews" }),
  }),
  visits: ({ offset }: PaginationArgs = {}): To => ({
    pathname: "/albums/visits",
    search: paginationSearch({ offset, offsetKey: "offsetVisits" }),
  }),
  artist: (artistId: number): To => `/albums/artist/${artistId}`,
  album: (albumId: number): To => `/albums/album/${albumId}`,
  newArtist: "/albums/newArtist",
  newAlbum: (artistId: number): To => `/albums/artist/${artistId}/newAlbum`,
  newReview: (albumId: number): To => `/albums/album/${albumId}/newReview`,
};
