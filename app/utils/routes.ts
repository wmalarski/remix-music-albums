export const routes = {
  home: "/",
  auth: "/auth",
  login: "/login",
  logout: "/logout",
  albums: "/albums",
  reviews: (start = 0) => `/albums/reviews/${start}`,
  visits: (start = 0) => `/albums/visits/${start}`,
  search: "/albums/search",
  artist: (artistId: number, start = 0): string =>
    `/albums/artist/${artistId}/${start}`,
  editArtist: (artistId: number): string => `/albums/artist/${artistId}/edit`,
  album: (albumId: number, start = 0): string =>
    `/albums/album/${albumId}/${start}`,
  editAlbum: (albumId: number): string => `/albums/album/${albumId}/edit`,
  newArtist: "/albums/newArtist",
  newAlbum: (artistId: number): string => `/albums/artist/${artistId}/newAlbum`,
  newReview: (albumId: number): string => `/albums/album/${albumId}/newReview`,
  editReview: (albumId: number, reviewId: number): string =>
    `/albums/album/${albumId}/review/${reviewId}`,
};
