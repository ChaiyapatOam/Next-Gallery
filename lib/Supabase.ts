import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAdmin = createClient(url, key);
export async function UploadImage(file: string, name: string) {
  //   const avatarFile = event.target.files[0];
  const { data, error } = await supabaseAdmin.storage
    .from("images")
    .upload(name, file);
}
export async function getAllData() {
  const { data } = await supabaseAdmin.from("images").select();
  console.log(data);
  return data
}
