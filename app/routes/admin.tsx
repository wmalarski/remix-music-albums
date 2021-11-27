import { ReactElement } from "react";
import {
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";
import { getPosts, Post } from "~/api/post";
import adminStyles from "~/styles/admin.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader: LoaderFunction = () => {
  return getPosts();
};

const Admin = (): ReactElement => {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
