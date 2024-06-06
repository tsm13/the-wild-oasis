import {
  ISignupFormValues,
  IUpdateCurrentUser,
  IUpdatePassword,
  LoginParams,
} from "../features/authentication/interface";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }: ISignupFormValues) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: LoginParams) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user as any;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserInfo({ fullName, avatar }: IUpdateCurrentUser) {
  // Update name:
  const { data, error } = await supabase.auth.updateUser({
    data: {
      fullName,
    },
  });

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // Update avatar:
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update avatar in the user:
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}

export async function updatePassword({ password }: IUpdatePassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) throw new Error(error.message);

  return data;
}
