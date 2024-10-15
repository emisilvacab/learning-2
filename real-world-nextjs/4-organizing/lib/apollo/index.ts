import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let uri = "https://rwnjssignbook.herokuapp.com/v1/graphql";
let apolloClient: any;

function createApolloClient() {
  return new ApolloClient({
    // For using the same apollo instance on both client and server
    ssrMode: typeof window === "undefined",
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
}

export function initApollo(initialState: any = null) {
  const client = apolloClient || createApolloClient();
  if (initialState) {
    client.cache.restore({
      ...client.extract(),
      ...initialState,
    });
  }
  if (typeof window === "undefined") {
    return client;
  }
  if (!apolloClient) {
    apolloClient = client;
  }
  return client;
}

export function useApollo(initialState: any) {
  return useMemo(() => initApollo(initialState), [initialState]);
}
