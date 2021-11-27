import { ReactElement } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { fetcher, FetcherPayload } from "~/api/fetcher";
import {
  GetArtist,
  GetArtistQuery,
  GetArtistQueryVariables,
} from "~/api/types";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "expected params.id");
  invariant(/^\d+$/.test(params.id), "params.id not number");
  return fetcher<GetArtistQueryVariables>(GetArtist, {
    id: Number(params.id),
  });
};

const Artist = (): ReactElement => {
  const artist = useLoaderData<FetcherPayload<GetArtistQuery>>();

  return (
    <div>
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </div>
  );
};

export default Artist;
