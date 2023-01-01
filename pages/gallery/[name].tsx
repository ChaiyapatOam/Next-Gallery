import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImageType } from "../../types";
import {
  getAllGallery,
  getImageByGallery,
  getImageFolder,
} from "../../lib/Supabase";
import { GetStaticPaths } from "next";
import BlurImage from "../../components/BlurImage";
import ImageList from "../../components/ImageList";

function Gallery({ images }: { images: ImageType[] }) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div>
      <h1 className="text-2xl px-20">{name} Gallery</h1>
      {images && images.length != 0 ? <ImageList images={images} /> : null}
    </div>
  );
}

export default Gallery;

export async function getStaticPaths() {
  const galleries = await getAllGallery();
  // console.log(galleries);

  if (!galleries) return;
  const paths = galleries.map((item) => {
    const name = String(item.name);
    // Should be return as a name of File = [name]
    return {
      params: { name },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  // console.log("Params",params);
  const images = await getImageByGallery(params.name);

  return {
    props: {
      images,
    },
  };
}
