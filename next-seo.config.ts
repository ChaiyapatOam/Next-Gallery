import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Next-Gallery",
  titleTemplate: "Next-Gallery",
  defaultTitle: "Next-Gallery",
  description:
    "Website to Upload Image and Gallery create with Next.js , TailwindCSS and Supabase",
  canonical: "https://next-gallery-supabase.vercel.app/",
  openGraph: {
    type: "website",
    url: "https://next-gallery-supabase.vercel.app/",
    siteName: "Next-Gallery",
    images: [{ url: "/banner.jpg" }],
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default config;
