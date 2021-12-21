import { ReactElement } from "react";
import { LoaderFunction, useLoaderData, useLocation } from "remix";
import { Flex, Heading, TabsContent } from "~/components";
import { ArtistAlbumScroll } from "~/modules/artists";
import { graphqlSdk } from "~/services/fetcher.server";
import { SelectAlbumsQuery } from "~/services/types.server";
import { json } from "~/utils/remix";
import { getRequestStart, scrollConfig } from "~/utils/scroll";
import { isNumber } from "~/utils/validation";

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!isNumber(params.artistId))
    throw new Response("Not Found", { status: 404 });

  const artistId = Number(params.artistId);
  const start = getRequestStart(request);

  const result = await graphqlSdk.SelectAlbums({
    limit: scrollConfig.limit,
    offset: start,
    where: { artist: { _eq: artistId } },
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
      <Flex direction="column">
        <Heading>Albums</Heading>
        <ArtistAlbumScroll query={query} />
      </Flex>
    </TabsContent>
  );
};

export default ArtistAlbums;
