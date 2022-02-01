import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import GraphQLClient from "@graphql/GraphQLClient";
import { NextPageWithLayout } from "types/types";
import { createBreakpoints } from "@chakra-ui/theme-tools";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = extendTheme({
  // mobile
  sm: "768px",
  // tablet
  md: "1024px",
  // desktop
  lg: "1216px",
  // fullhd
  xl: "1408px",
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ApolloProvider client={GraphQLClient}>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
