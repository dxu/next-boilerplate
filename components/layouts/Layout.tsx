import React from "react";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

type Props = {};
export default function Layout({ children }: React.PropsWithChildren<Props>) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
