import NextAuth, { JWT, NextAuthConfig, Session } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";

import { DecodedType } from "./lib/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  providers: [Keycloak],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        if (account.access_token) {
          const decoded = jwtDecode<DecodedType>(account.access_token);

          token.roles = decoded.resource_access["course-manager"].roles;
        }

        token.id = profile.sub;
        token.first_name = profile.given_name;
        token.last_name = profile.family_name;
        token.email_verified = profile.email_verified;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.email_verified = token.email_verified;
        session.user.roles = token.roles;
      }

      return session;
    },
  },
} satisfies NextAuthConfig);
