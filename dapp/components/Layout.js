import React from "react";
import { Container, Grid } from "semantic-ui-react";
import Head from "next/head";
import NavMenu from "./NavMenu";

const Layout = (props) => {
  return (
    <Container>
      <Head>
        <title>RoyalT</title>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <NavMenu>{props.children}</NavMenu>
    </Container>
  );
};

export default Layout;
