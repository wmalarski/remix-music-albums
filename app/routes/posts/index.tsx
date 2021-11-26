import { ReactElement } from "react";
import { useLoaderData } from "remix";
import { queryArtists } from "~/api/artists";

export const loader = async (): Promise<Response> => {
  return queryArtists();
};

const Posts = (): ReactElement => {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
};

export default Posts;
