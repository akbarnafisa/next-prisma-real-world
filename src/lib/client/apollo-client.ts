import { ApolloClient, ApolloLink, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from "crypto-hash";
import { cache } from "../cache";
import { BASE_URL } from "../constants";

export const cacheLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

export const httpLink = createHttpLink({
  uri: `${BASE_URL}/api`,
  credentials: "same-origin",
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV === "development") {
    // ODOT: check this graphql error
    // confirmed
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError.message}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    // comment presisted query, because it's hard to invalidate :\
    // cacheLink,
    httpLink
  ]),
  connectToDevTools: process.env.NODE_ENV === "development",
  cache,
  // TODO: handle one Apollo client, then try to refetchQuery when updating the article
  // https://medium.com/@zhamdi/server-side-rendering-ssr-using-apollo-and-next-js-ac0b2e3ea461
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
  ssrMode: typeof window === "undefined",
});

export default client;
