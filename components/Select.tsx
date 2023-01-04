import React from "react";
import { GalleryType } from "../types";
import { useRouter } from "next/router";

const Select = ({
  galleries,
  setFolder,
}: {
  galleries: GalleryType[] | [];
  setFolder: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="relative w-1/2 mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-2.5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <select
        className="w-full p-2.5 text-gray-900 font-medium bg-white text-center border rounded-md shadow-sm outline-none appearance-none focus:border-blue-600"
        aria-label="Select Gallery"
        onChange={(e) => setFolder(e.target.value)}
      >
        {galleries.length != 0 ? (
          galleries.map((g, id) => {
            return (
              <option key={id} value={g.name}>
                {g.name}
              </option>
            );
          })
        ) : (
          <option value={name}>{name}</option>
        )}
      </select>
    </div>
  );
};

export default Select;
