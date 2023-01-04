import Head from "next/head";
import React from "react";
import { MetaType } from "../types";
import { NextSeo } from "next-seo";
import SEO from "../next-seo.config";
const Meta = (customMeta?: MetaType) => {
  const defaultMeta = {
    title: "Next Gallery",
    description: `Website to Upload Image and Gallery create with Next.js , TailwindCSS and Supabase`,
    image: "/banner.jpg",
    type: "website",
  };
  const meta = {
    ...SEO,
    title: customMeta?.title,
    image: customMeta?.image,
    type: "website",
    openGraph: {
      type: "website",
      url: "https://next-gallery-supabase.vercel.app/",
      images: [{ url: customMeta?.image }],
    },
  };
  // const meta = Object.assign({}, defaultMeta, customMeta);
  return (
    <Head>
      <title>{meta.title}</title>
      <meta charSet="utf-8" />
      <meta name="robots" content="follow, index" />
      <meta name="description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="og:description" content={meta.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:image" content={meta.image} />
      <NextSeo
        title={meta.title}
        titleTemplate={meta.title}
        defaultTitle={meta.title}
        description={meta.description}
        canonical="https://next-gallery-supabase.vercel.app/"
        openGraph={{
          url: "https://next-gallery-supabase.vercel.app/",
          title: meta.title,
          description: meta.description,
          images: [
            {
              url: meta.image as string,
              width: 800,
              height: 420,
              alt: meta.title,
            },
          ],
        }}
      />
    </Head>
  );
};

export default Meta;
