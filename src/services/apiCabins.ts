import { ICabinForm } from "../features/cabins/interface";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
}

export async function createCabin(newCabin: ICabinForm) {
  const imgPath = await uploadImage(newCabin);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imgPath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  return data;
}

export async function updateCabin(cabin: ICabinForm, id: string) {
  if (!id) return;

  const imgPath = await uploadImage(cabin);

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imgPath })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated.");
  }

  return data;
}

async function uploadImage(cabin: ICabinForm) {
  if (typeof cabin.image === "string") return cabin.image;
  if (cabin.image instanceof File) {
    const imgName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

    const imgPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imgName, cabin.image, {
        // optional settings:
        cacheControl: "3600",
        upsert: false,
      });

    // Deleting the cabin if there was an error while uploading the cabin image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", cabin.id);
      console.error(storageError);
      throw new Error(
        "Cabin was not created due to an image upload error. Please try again."
      );
    }

    return imgPath;
  }
}
