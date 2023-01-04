import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import GalleryProvider from "../context/GalleryContext";
import Meta from "../components/Meta";
import { MetaType } from "../types";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
function MyApp({ Component, pageProps }: AppProps, customMeta: MetaType) {
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
  let meta = {
    title: "Next Gallery",
    description: `Website to Upload Image and Gallery create with Next.js , TailwindCSS and Supabase`,
    image: "/banner.jpg",
    type: "website",
  };
  return (
    <>
      {/* <Meta title={meta.title} type="website" image={meta.image} /> */}
      {/* <DefaultSeo {...SEO} /> */}
      {loading ? (
        <Loading />
      ) : (
        <GalleryProvider>
          <NavBar />
          <Component {...pageProps} />
        </GalleryProvider>
      )}
    </>
  );
}

export default MyApp;
