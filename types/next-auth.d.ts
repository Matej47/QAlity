// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  /** The shape of the user object returned by `authorize()` */
  interface User {
    id: string;
    email: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}
