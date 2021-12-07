import { fetch } from "cross-fetch";
import { DocumentNode } from "graphql";
import invariant from "tiny-invariant";
import { getSdk, Requester } from "./types.server";

type GraphqlApiConfig = {
  apiEndpoint: string;
  adminSecret: string;
};

export type FetcherError = {
  message: string;
  extensions?: unknown;
};

export type FetcherActionData = {
  fetcherErrors?: FetcherError[];
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

export const jsonFetcher: Requester = async <TData, TVariables>(
  documentNode: DocumentNode,
  variables?: TVariables
): Promise<FetcherPayload<TData>> => {
  const result = await fetcher(documentNode, variables);

  const json = await result.json();

  if (json.errors) {
    console.error(
      JSON.stringify({ definitions: documentNode.definitions, json }, null, 2)
    );
  }

  return json;
};

export const graphqlSdk = getSdk(jsonFetcher);
