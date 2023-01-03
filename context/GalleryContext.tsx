import * as React from "react";
import { GalleryContextType, GalleryType } from "../types";

export const GalleryContext = React.createContext<GalleryContextType | null>(
  null
);

const GalleryProvider = ({ children }: { children: React.ReactNode }) => {
  const [galleries, setGalleries] = React.useState<GalleryType[] | []>([]);

  const saveData = (data: GalleryType[]) => {
    setGalleries(data);
  };

  return (
    <GalleryContext.Provider value={{ galleries, saveData }}>
      {children}
    </GalleryContext.Provider>
  );
};
export default GalleryProvider;
