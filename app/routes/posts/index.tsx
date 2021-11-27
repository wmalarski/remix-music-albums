import { ReactElement } from "react";
import { useLoaderData } from "remix";
import { fetcher } from "~/api/fetcher";
import { GetArtists, GetArtistsQuery } from "~/api/types";

export const loader = async (): Promise<Response> => fetcher(GetArtists);

const Posts = (): ReactElement => {
  const posts = useLoaderData<GetArtistsQuery>();
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
};

export default Posts;
