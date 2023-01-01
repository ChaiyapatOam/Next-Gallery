import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../config";
let supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function getAllGallery() {
  const { data, error } = await supabaseAdmin.from("Gallery").select();
  // console.log(data);
  if (error) console.log(error);
  return data;
}

export async function getImageByGallery(name: string) {
  const { data, error } = await supabaseAdmin
    .from("Images")
    .select("id, name, url, tag")
    .eq("gallery_name", name);
  // console.log(data);
  if (error) console.log(error);
  return data;
}

export async function createData(
  galleryName: string,
  fileName: string,
  url: string
) {
  await supabaseAdmin.from("Gallery").insert({ name: galleryName, cover: url });

  const { data, error } = await supabaseAdmin
    .from("Images")
    .insert({ name: fileName, url: url, gallery_name: galleryName });
  // console.log(data);
  if (error) console.log("CreateData", error);

  return data;
}

// Storage
export async function UploadImage(folder: string, file: File) {
  let fileName =
    folder + "/" + encodeURIComponent(file.name) + Date.now().toString();
  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(fileName, file);
  if (error) console.log(error);

  const { data } = supabaseAdmin.storage.from("images").getPublicUrl(fileName);
  console.log("URL=", data.publicUrl);
  const image = {
    name: fileName,
    url: data.publicUrl,
  };
  return image;
}
export async function createFolder() {}

export async function getImageFolder(folderName: string) {
  const { data, error } = await supabaseAdmin.storage
    .from("images")
    .list(folderName);
  // console.log(data);

  if (error) console.log(error);
  return data;
}
