export const routes = {
  home: "/",
  auth: "/auth",
  logout: "/logout",
  albums: "/albums",
  reviews: "/albums/reviews",
  visits: "/albums/visits",
  artist: (artistId: number): string => `/albums/artist/${artistId}`,
  editArtist: (artistId: number): string => `/albums/artist/${artistId}/edit`,
  album: (albumId: number): string => `/albums/album/${albumId}`,
  editAlbum: (albumId: number): string => `/albums/album/${albumId}/edit`,
  newArtist: "/albums/newArtist",
  newAlbum: (artistId: number): string => `/albums/artist/${artistId}/newAlbum`,
  newReview: (albumId: number): string => `/albums/album/${albumId}/newReview`,
  editReview: (albumId: number, reviewId: number): string =>
    `/albums/album/${albumId}/review/${reviewId}`,
};

export type RouteKind = keyof typeof routes | `${keyof typeof routes}/index`;
