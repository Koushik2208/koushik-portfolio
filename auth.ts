// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email;
        const verified = (profile as any)?.email_verified;

        const allowedEmail = process.env.ALLOWED_GMAIL;

        if (verified && email === allowedEmail) {
          return true;
        }
        return false;
      }

      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
});
