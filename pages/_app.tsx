import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  useEffect(() => {
    const start = () => {
      // console.log("start");
      setLoading(true);
    };
    const end = () => {
      // console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Head>
            <title>Next Gallery</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <NavBar />
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
