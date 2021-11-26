import { ReactElement } from "react";
import { Link, useLoaderData } from "remix";
import { getPosts } from "~/api/post";

type Post = {
  slug: string;
  title: string;
};

export const loader = async (): Promise<Post[]> => {
  return getPosts();
};

const Posts = (): ReactElement => {
  const posts = useLoaderData<Post[]>();
  console.log(posts);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
