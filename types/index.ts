export type ImageType = {
  id: number;
  name: string;
  url: string;
  tag: string;
  gallery_name: string;
};
export type ImageListType = {
  id: number;
  name: string;
  href: string;
  imgName: string;
  imgSrc: string;
  userName: string;
};

export type GalleryType = {
  id : number;
  name : string;
  cover : string;
  tag : string;
}
export type MetaType = {
  title: string | undefined;
  description: string;
  image: string;
  type  : string;
}
export type FolderType = {
  id : number;
  name : string;
}