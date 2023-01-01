import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Next Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
