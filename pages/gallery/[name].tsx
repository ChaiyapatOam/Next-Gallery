import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getImageByGallery } from "../../lib/Supabase";
import ImageList from "../../components/ImageList";
import { ImageType } from "../../types";
import Meta from "../../components/Meta";

function Gallery({ images }: { images: ImageType[] }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div>
      {/* <Meta title={name} image={images[0]}/> */}
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
  const name = context.params.name;
  const images = await getImageByGallery(name);
  const meta = {
    title: name,
  };
  return {
    props: {
      images,
      meta,
    },
  };
}
