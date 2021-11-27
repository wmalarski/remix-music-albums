export const routes = {
  albums: "/albums",
  artist: (artistId: number): string => `/albums/artist/${artistId}`,
  album: (albumId: number): string => `/albums/album/${albumId}`,
  newArtist: "/albums/newArtist",
  newAlbum: (artistId: number): string => `/albums/artist/${artistId}/newAlbum`,
};
