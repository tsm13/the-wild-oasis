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

export interface IUpdateCurrentUser {
  fullName: string;
  avatar: File | null;
}

export interface IUpdatePassword {
  password: string;
  confirmPassword: string;
}
