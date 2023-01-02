import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImageType } from "../../types";
import { getAllGallery, getImageByGallery } from "../../lib/Supabase";
import BlurImage from "../../components/BlurImage";
import ImageList from "../../components/ImageList";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

function Gallery({ images }: { images: ImageType[] }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      {/* <h1 className="text-2xl px-20">{name} Gallery</h1> */}
      {images && images.length != 0 ? <ImageList images={images} /> : null}
    </div>
  );
}

export default Gallery;

export async function getServerSideProps(context: any) {
  if (!context.params.name)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  const images = await getImageByGallery(context.params.name);
  return {
    props: {
      images,
    },
  };
}
