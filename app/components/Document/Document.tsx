import { ReactElement } from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "remix";

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

export const Document = ({ children, title }: DocumentProps): ReactElement => {
  return (
    <html lang="en">
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
