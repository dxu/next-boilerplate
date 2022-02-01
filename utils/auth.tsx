import React from "react";
import cookie from "cookie";
import { NextPage } from "next";
import { NextPageWithLayout } from "types/types";

type ComponentWithAuthProps = {
  auth_token: string;
};

// Usage: useContext(AuthContext)
export const AuthContext = React.createContext("");

// we explicitly only have a higher order component to allow for
// individual pages to be statically optimized (e.g, marketing pages)
export function withCookieAuth(
  ComponentClass: NextPageWithLayout
): NextPageWithLayout<ComponentWithAuthProps> {
  const ComponentWithAuth: NextPageWithLayout<ComponentWithAuthProps> = (
    props
  ) => {
    return (
      <AuthContext.Provider value={props.auth_token}>
        <ComponentClass {...props} />
      </AuthContext.Provider>
    );
  };

  if (ComponentClass.getLayout) {
    ComponentWithAuth.getLayout = ComponentClass.getLayout;
  }

  ComponentWithAuth.getInitialProps = ({ req }) => {
    const initProps = { auth_token: "" };

    if (req && req.headers) {
      const cookies = req.headers.cookie;

      if (typeof cookies === "string") {
        const cookiesJSON = cookie.parse(cookies);

        initProps.auth_token = cookiesJSON.auth_token;
      }
    }

    return initProps;
  };
  return ComponentWithAuth;
}
