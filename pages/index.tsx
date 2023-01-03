import { useContext, useState } from "react";
import { getAllGallery } from "../lib/Supabase";
import { GalleryContextType, GalleryType } from "../types";
import GalleryCard from "../components/GalleryCard";
import { GalleryContext } from "../context/GalleryContext";

const Home = ({ galleries }: { galleries: GalleryType[] }) => {
  const { saveData } = useContext(GalleryContext) as GalleryContextType;
  saveData(galleries);
  return (
    <div className="Home">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* Images will go here */}

          {galleries && galleries.length != 0 ? (
            galleries.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                image={gallery.cover}
                name={gallery.name}
                tag={gallery.tag}
              />
            ))
          ) : (
            <h1 className="text-center text-3xl">No Image yet!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await getAllGallery();

  return {
    props: {
      galleries: data,
    },
  };
}
