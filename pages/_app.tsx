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
  const meta = {
    title: "Next Gallery",
    description: `Website to Upload Image and Gallery create with Next.js , TailwindCSS and Supabase`,
    image: "/vercel.svg",
    type: "website",
  };
  return (
    <div>
      <Head>
        <title>Next Gallery</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://next-gallery-supabase.vercel.app${Router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="ChaiyapatOam" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NavBar />
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
