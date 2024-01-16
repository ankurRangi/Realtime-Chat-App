// Responsible for all the authentication we do in our Application

import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";

// Function to retrive google credentials
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missin GOOGLE_CLIENT_ID");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missin GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db), //DB interaction will happen automatically
  session: {
    // How you want to save the user session, JWT session
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days = 2592000 seconds
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = (await db.get(`user:${user}`)) as User | null; // Create a interface User in types/db.d.ts file

      if (!dbUser) {
        token.id = user!.id; // user! signifies we know the value of user is not null
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    // Whenever a session is generated, we get access to other application when we verify if the user has a session
    async session({ session, token }) {
      if (token) {
        // types/next-auth.d.ts file created to decalre module and get IntelliSense
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    // Redirect to /dashboard after login
    redirect() {
      return "/dashboard";
    },
  },
};
