import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import GraphQLClient from "@graphql/GraphQLClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={GraphQLClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
