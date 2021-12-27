import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useLocation } from "remix";
import { TabsContent } from "~/components";
import { useScrollNavigation } from "~/hooks/useScrollNavigation";
import { ArtistAlbumScroll } from "~/modules/artist";
import { graphqlSdk } from "~/services/fetcher.server";
import { SelectAlbumsQuery } from "~/services/types.server";
import { json, notFound } from "~/utils/remix";
import { isNumber, toNumber } from "~/utils/validation";

export const loader: LoaderFunction = async ({ params }) => {
  if (!isNumber(params.artistId)) throw notFound();

  const result = await graphqlSdk.SelectAlbums({
    limit: useScrollNavigation.config.limit,
    offset: toNumber(params.start, 0),
    where: { artist: { _eq: Number(params.artistId) } },
  });

  if (result.errors)
    throw new Response(JSON.stringify(result.errors), { status: 500 });

  return json<SelectAlbumsQuery>(
    result.data ?? { album: [], albumAggregate: {} }
  );
};

const ArtistAlbums = (): ReactElement => {
  const query = useLoaderData<SelectAlbumsQuery>();
  const location = useLocation();

  return (
    <TabsContent value={location.pathname}>
      <ArtistAlbumScroll query={query} />
    </TabsContent>
  );
};

export default ArtistAlbums;
