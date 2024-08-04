import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      email_verified: boolean;
      roles: string[];
      resource_roles: string[];
      access_token: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified: boolean;
    roles: string[];
    resource_roles: string[];
  }

  interface JWT {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified: boolean;
    roles: string[];
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    access_token: string;
  }
}
