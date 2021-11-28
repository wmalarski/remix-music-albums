import { renderToString } from "react-dom/server";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";
import { getCssText } from "./styles/stitches.config";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
): Response {
  try {
    const markup = renderToString(
      <RemixServer context={remixContext} url={request.url} />
    ).replace(
      /<\/head>/,
      `<style id="stitches">${getCssText()}</style></head>`
    );
    responseHeaders.set("Content-Type", "text/html");
    return new Response("<!DOCTYPE html>" + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("error", error);
    return new Response("hello", {
      status: 500,
      headers: responseHeaders,
    });
  }
}
