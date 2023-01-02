import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.isReady && setIsLoading(false);
  }, []);
  return (
    <div>
      {isLoading ? (
       <Loading/>
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
