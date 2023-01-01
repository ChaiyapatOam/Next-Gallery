import Image from "next/image";
import { useState } from "react";
import { ImageType } from "../types";
import Link from "next/link";
import { getImageByGallery } from "../lib/Supabase";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function GalleryCard({
  image,
  name,
  tag,
}: {
  image: string;
  name: string;
  tag: string;
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <Link href={`/gallery/${name}`}>
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt=""
            src={image}
            fill
            style={{ objectFit: "cover" }}
            className={cn(
              "group-hover:opacity-75 duration-700 ease-in-out",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            priority
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </Link>
      {/* map tags */}
      <h3 className="mt-4 tag">#{tag}</h3>

      {/* gallery name */}
      <p className="mt-1 text-lg font-medium text-gray-900">@{name}</p>
    </div>
  );
}
