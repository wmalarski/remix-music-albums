import { fetch } from "cross-fetch";
import { DocumentNode } from "graphql";
import invariant from "tiny-invariant";

type GraphqlApiConfig = {
  apiEndpoint: string;
  adminSecret: string;
};

export type FetcherError = {
  message: string;
  extensions: {
    path: string;
    code: string;
  };
};

export type FetcherPayload<TData> = {
  data?: TData;
  errors?: FetcherError[];
};

const getGraphqlApiConfig = (): GraphqlApiConfig => {
  invariant(
    process.env.GRAPHQL_API_ENDPOINT,
    `GRAPHQL_API_ENDPOINT has bad data!`
  );

  invariant(
    process.env.GRAPHQL_API_ADMIN_SECRET,
    `GRAPHQL_API_ADMIN_SECRET has bad data!`
  );

  return {
    apiEndpoint: process.env.GRAPHQL_API_ENDPOINT,
    adminSecret: process.env.GRAPHQL_API_ADMIN_SECRET,
  };
};

export const fetcher = <TVariables>(
  documentNode: DocumentNode,
  variables?: TVariables
): Promise<Response> => {
  const { adminSecret, apiEndpoint } = getGraphqlApiConfig();

  const query = documentNode.loc?.source.body;

  return fetch(apiEndpoint, {
    body: JSON.stringify({ query, variables }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": adminSecret,
    },
  });
};

export const jsonFetcher = async <TData, TVariables>(
  documentNode: DocumentNode,
  variables?: TVariables
): Promise<FetcherPayload<TData>> => {
  const result = await fetcher(documentNode, variables);

  const json = await result.json();

  return json;
};
