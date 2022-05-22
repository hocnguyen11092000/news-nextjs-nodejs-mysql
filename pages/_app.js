import Router from "next/router";
import { useState } from "react";
import CubeLoading from "../components/CubeLoading";
import Layout from "../components/Layout";
import { DataProvider } from "../store/GlobalState";
import "../styles/circle-loading.css";
import "../styles/globals.css";
import "../styles/cube-loading.css";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  return loading ? (
    <CubeLoading></CubeLoading>
  ) : (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

export default MyApp;
