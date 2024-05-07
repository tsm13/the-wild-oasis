import { ICabinForm } from "../interfaces/cabin-interface";
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
  console.log(newCabin);

  if (newCabin.image instanceof File) {
    const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );

    const imgPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

    // Creating cabin:
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imgPath }])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted.");
    }

    // Uploading image:
    const { error: StorageError } = await supabase.storage
      .from("cabin-images")
      .upload(imgName, newCabin.image, {
        // optional settings:
        cacheControl: "3600",
        upsert: false,
      });

    // Deleting the cabin if there was an error while uploading the cabin image
    if (StorageError) {
      await supabase.from("cabins").delete().eq("id", newCabin.id);
      console.error(StorageError);
      throw new Error(
        "Cabin was not created due to an image upload error. Please try again."
      );
    }
    return data;
  }
}
