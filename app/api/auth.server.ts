import { redirect } from "remix";
import { Auth0Strategy, Authenticator } from "remix-auth";
import invariant from "tiny-invariant";
import {
  commitSession,
  getSession,
  sessionStorage,
} from "~/api/session.server";
import { routes } from "~/utils/routes";

export type Role = "admin" | "user";

export type Claims = {
  role: Role;
  roles: Role[];
};

export type User = {
  displayName: string;
  picture: string;
  locale: string;
  claims: Claims;
};

export const AuthStrategyName = "auth0";

const setupAuth0 = (): Authenticator<User> => {
  const {
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN,
    AUTH0_SCOPE,
    AUTH0_CALLBACK_URL,
  } = process.env;

  invariant(AUTH0_DOMAIN, `AUTH0_DOMAIN has bad data!`);
  invariant(AUTH0_SCOPE, `AUTH0_SCOPE has bad data!`);
  invariant(AUTH0_CLIENT_ID, `AUTH0_CLIENT_ID has bad data!`);
  invariant(AUTH0_CLIENT_SECRET, `AUTH0_CLIENT_SECRET has bad data!`);
  invariant(AUTH0_CALLBACK_URL, `AUTH0_CALLBACK_URL has bad data!`);

  const authenticator = new Authenticator<User>(sessionStorage);

  authenticator.use(
    new Auth0Strategy(
      {
        callbackURL: AUTH0_CALLBACK_URL,
        clientID: AUTH0_CLIENT_ID,
        clientSecret: AUTH0_CLIENT_SECRET,
        domain: AUTH0_DOMAIN,
        scope: AUTH0_SCOPE,
      },
      async (_accessToken, _refreshToken, _extra, profile): Promise<User> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const claims = (profile._json as any)["https://hasura.io/jwt/claims"];
        return {
          displayName: profile.displayName,
          picture: profile._json.picture,
          locale: profile._json.locale,
          claims: {
            role: claims["x-hasura-default-role"],
            roles: claims["x-hasura-allowed-roles"],
          },
        };
      }
    ),
    AuthStrategyName
  );

  return authenticator;
};

export const authenticator = setupAuth0();

export const loginRedirect = async (request: Request): Promise<Response> => {
  const session = await getSession(request);
  session.set("route", request.url);
  const commit = await commitSession(session);
  return redirect(routes.login, { headers: { "Set-Cookie": commit } });
};
