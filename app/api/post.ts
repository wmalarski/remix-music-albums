import parseFrontMatter from "front-matter";
import fs from "fs/promises";
import { marked } from "marked";
import path from "path";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
  html: string;
};

export type PostInput = {
  slug: string;
  title: string;
  markdown: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const isValidPostAttributes = (
  attributes: any
): attributes is PostMarkdownAttributes => {
  return attributes?.title;
};

// relative to the server output not the source!
const postsPath = path.join(__dirname, "..", "posts");

export const getPosts = async (): Promise<Post[]> => {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));

      const { attributes, body } = parseFrontMatter(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );

      const html = marked(body);

      return {
        slug: filename.replace(/\.md$/, ""),
        html,
        title: attributes.title,
      };
    })
  );
};

export const getPost = async (slug: string): Promise<Post> => {
  const filepath = path.join(postsPath, slug + ".md");

  const file = await fs.readFile(filepath);

  const { attributes, body } = parseFrontMatter(file.toString());

  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );

  const html = marked(body);

  return { slug, html, title: attributes.title };
};

export const createPost = async (post: PostInput): Promise<Post> => {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(path.join(postsPath, post.slug + ".md"), md);
  return getPost(post.slug);
};
