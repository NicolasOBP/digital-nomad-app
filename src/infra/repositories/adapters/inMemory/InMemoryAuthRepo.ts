import { AuthUser } from "@/src/domain/auth/AuthUser";
import { AuthSignUpParams, IAuthRepo } from "@/src/domain/auth/IAuthRepo";

import { authUsers } from "./data/authUsers";

export class InMemoryAuthRepo implements IAuthRepo {
  async signIn(email: string, password: string): Promise<AuthUser> {
    const user = authUsers.find((user) => user.email === email);

    if (user) {
      return user;
    }

    throw new Error("User not found");
  }
  async signOut(): Promise<void> {}

  async sendResetPasswordEmail(email: string): Promise<void> {
    console.log("email sent to", { email });
  }

  async signUp(params: AuthSignUpParams): Promise<void> {
    const userAlreadyExists = authUsers.find(
      (user) => user.email === params.email,
    );

    if (userAlreadyExists) {
      throw new Error("user already exisit");
    }

    return;
  }
}
