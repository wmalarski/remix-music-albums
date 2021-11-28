type PaginationArgs = {
  offset?: number;
};

type PaginationSearchArgs = PaginationArgs & {
  offsetKey: string;
  pathname: string;
};

const paginationSearch = ({
  offset,
  offsetKey,
  pathname,
}: PaginationSearchArgs): string =>
  `${pathname}${!offset ? "" : `?${offsetKey}=${offset}`}`;

export const routes = {
  home: "/",
  albums: ({ offset }: PaginationArgs = {}): string =>
    paginationSearch({
      pathname: "/albums",
      offset,
      offsetKey: "offset",
    }),
  reviews: ({ offset }: PaginationArgs = {}): string =>
    paginationSearch({
      pathname: "/albums/reviews",
      offset,
      offsetKey: "offsetReviews",
    }),
  visits: ({ offset }: PaginationArgs = {}): string =>
    paginationSearch({
      pathname: "/albums/visits",
      offset,
      offsetKey: "offsetVisits",
    }),
  artist: (artistId: number): string => `/albums/artist/${artistId}`,
  album: (albumId: number): string => `/albums/album/${albumId}`,
  newArtist: "/albums/newArtist",
  newAlbum: (artistId: number): string => `/albums/artist/${artistId}/newAlbum`,
  newReview: (albumId: number): string => `/albums/album/${albumId}/newReview`,
};
