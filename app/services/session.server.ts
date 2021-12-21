import { createCookieSessionStorage, Session } from "remix";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const getSession = (request: Request): Promise<Session> => {
  return sessionStorage.getSession(request.headers.get("Cookie"));
};

export const { commitSession, destroySession } = sessionStorage;
