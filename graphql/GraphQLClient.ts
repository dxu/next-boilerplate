import {
  ApolloClient,
  InMemoryCache,
  from,
  split,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { getLocalStorageKey } from "../utils/api_client";
import { IS_SERVER } from "@utils/constants";

// TODO: fix this to not be hardcoded to localhost
const uploadLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_REACT_APP_SERV_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/graphql`,
});

// TODO: only do this during development
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

let link = IS_SERVER
  ? new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_REACT_APP_WS_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/graphql`,
    })
  : new WebSocketLink({
      uri: `${process.env.NEXT_PUBLIC_REACT_APP_WS_PROTOCOL}${process.env.NEXT_PUBLIC_REACT_APP_SERV_HOSTNAME}/graphql`,
      options: {
        reconnect: true,
        connectionParams: {
          Authorization: localStorage.getItem(getLocalStorageKey()),
        },
      },
    });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  link,
  from([errorLink, uploadLink])
);

let client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
