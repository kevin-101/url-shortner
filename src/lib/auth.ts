import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";

console.log(process.env.AUTH_GOOGLE_ID);
console.log(process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
