import App from "next/app";
import Head from "next/head";
import React from "react";
import { createGlobalStyle } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import palette from "../utils/palette";
const Styles = createGlobalStyle`
  html, body {

  }
`;

const Content = ({ component, pageProps }) => {
  const Component = component;
  return (
    <>
      <Head>
        <title>COVID-19 Dashboard</title>
      </Head>
      <CssBaseline />
      <Styles />

      <Component {...pageProps} />
    </>
  );
};
class MyApp extends App<any, any> {
  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps, apollo } = this.props;

    return <Content component={Component} pageProps={pageProps} />;
  }
}
export default MyApp;
