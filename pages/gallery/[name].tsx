import React, { useEffect, useState } from "react";
import { getImageByGallery } from "../../lib/Supabase";
import ImageList from "../../components/ImageList";
import { ImageType, MetaType } from "../../types";
import Meta from "../../components/Meta";

function Gallery({ images, meta }: { images: ImageType[]; meta: MetaType }) {
  return (
    <div>
      <Meta title={meta.title} image={meta.image} type="website" />
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
  if (!images) return;

  const meta = {
    title: name,
    image: images[0].url,
  };

  return {
    props: {
      images,
      meta,
    },
  };
}
