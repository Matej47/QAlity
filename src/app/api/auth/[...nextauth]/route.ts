// src/app/api/auth/[...nextauth]/route.ts
import fs from "fs";
import path from "path";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req
      ): Promise<null | { id: string; email: string }> {
        if (!credentials) return null;

        // Build absolute path to users.json in project root
        const usersFile = path.join(process.cwd(), "users.json");
        const fileContents = fs.readFileSync(usersFile, "utf-8");
        const users: Array<{ email: string; password: string }> =
          JSON.parse(fileContents);

        // Find matching user
        const found = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );
        if (!found) return null;

        // Return minimal user object with required `id` field
        return { id: found.email, email: found.email };
      },
    }),
  ],

  session: {
    strategy: "jwt", // use JWT sessions
  },

  pages: {
    signIn: "/login", // custom login page
  },

  callbacks: {
    async signIn({ user }) {
      // only allow company domain
      return user.email.endsWith("@go-bbg.com");
    },
    async jwt({ token, user }) {
      // include `id` in the token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // expose `id` on session.user
      session.user.id = token.id as string;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
