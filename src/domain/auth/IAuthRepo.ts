import { AuthUser } from "./AuthUser";

export type AuthSignUpParams = {
  fullName: string;
  email: string;
  password: string;
};

export interface IAuthRepo {
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  signUp: (params: AuthSignUpParams) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
}
