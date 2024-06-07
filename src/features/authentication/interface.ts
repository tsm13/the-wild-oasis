export interface ISignupFormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

// REVIEW:
export interface User {
  id?: string;
  user_metadata: UserMetadata;
  email?: string;
  role?: string;
}

export interface UserMetadata {
  avatar: string;
  fullName: string;
}
// ^ these two

export interface IUpdateCurrentUser {
  fullName: string;
  avatar: File | null;
}

export interface IUpdatePassword {
  password: string;
  passwordConfirm: string;
}
