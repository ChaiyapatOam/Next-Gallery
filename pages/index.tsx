import Image from "next/image";
import BlurImage from "../components/BlurImage";
import { getAllData } from "../lib/Supabase";
import { ChangeEvent, useState } from "react";
import { ImageType } from "../types";

const Home = ({ images }: { images: ImageType[] }) => {
  const [file, setFile] = useState<File>();
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {/* Images will go here */}
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await getAllData();

  return {
    props: {
      images: data,
    },
  };
}
