import Head from "next/head";
import React from "react";
import { MetaType } from "../types";

const Meta = (meta: MetaType) => {
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  );
};

export default Meta;
