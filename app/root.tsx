import { ReactElement } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import { Divider, Flex, Layout, LayoutFooter } from "./components";
import { darkTheme, globalStyles } from "./styles/stitches.config";

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
const App = (): ReactElement => {
  globalStyles();
  return (
    <Document>
      <Outlet />
    </Document>
  );
};

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export const ErrorBoundary = ({ error }: { error: Error }): ReactElement => {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <Flex direction="column">
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <Divider />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </Flex>
        <LayoutFooter />
      </Layout>
    </Document>
  );
};

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export const CatchBoundary = (): ReactElement => {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
        <LayoutFooter />
      </Layout>
    </Document>
  );
};

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

const Document = ({ children, title }: DocumentProps): ReactElement => {
  return (
    <html lang="en" className={darkTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

export default App;
