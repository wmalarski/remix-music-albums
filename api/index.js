import { createRequestHandler } from "@remix-run/vercel";

export default createRequestHandler({
  build: require("./_build"),
});
