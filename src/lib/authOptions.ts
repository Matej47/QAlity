import fs from "fs";
import path from "path";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";

// Extend the Session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isValid: boolean;
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const usersFile = path.join(process.cwd(), "users.json");
        const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

        const found = users.find(
          (u: any) =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!found) return null;
        return { id: found.email, email: found.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      return user.email.endsWith("@go-bbg.com");
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // Check if user still exists
      const usersFile = path.join(process.cwd(), "users.json");
      const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

      const found = users.find((u: any) => u.email === token.id);
      
      // If user not found, throw error to invalidate session
      if (!found) {
        throw new Error("User no longer exists");
      }

      session.user.id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
