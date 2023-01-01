import React from "react";
import { ImageType } from "../types";
import BlurImage from "./BlurImage";

function ImageList({ images }: { images: ImageType[] }) {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {/* Images will go here */}
        {images && images.length != 0 ? (
          images.map((image) => <BlurImage key={image.id} image={image.url} />)
        ) : (
          <h1 className="text-center text-3xl">No Image yet!</h1>
        )}
      </div>
    </div>
  );
}

export default ImageList;
