import { fetcher } from "./fetcher";

const queryArtistsDocument = `
  query Artists {
    artist {
      id
      sid
      name
    }
  }
`;

export const queryArtists = (): Promise<Response> =>
  fetcher(queryArtistsDocument);
