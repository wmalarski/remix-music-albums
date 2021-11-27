export const routes = {
  home: "/",
  albums: "/albums",
  reviews: "/albums/reviews",
  visits: "/albums/visits",
  artist: (artistId: number): string => `/albums/artist/${artistId}`,
  album: (albumId: number): string => `/albums/album/${albumId}`,
  newArtist: "/albums/newArtist",
  newAlbum: (artistId: number): string => `/albums/artist/${artistId}/newAlbum`,
  newReview: (albumId: number): string => `/albums/album/${albumId}/newReview`,
};
