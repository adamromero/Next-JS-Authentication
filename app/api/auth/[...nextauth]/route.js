import NextAuth from "next-auth/next";
import PatreonProvider from "next-auth/providers/patreon";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

export const nextAuthOptions = {
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
      }),
   ],
   pages: {
      signIn: "/",
   },
   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      async jwt({ token, account, profile }) {
         if (account) {
            token.accessToken = account.access_token;
            token.id = profile.id;
         }
         return token;
      },
      async session({ token, session }) {
         return session;
      },
      async redirect({ url, baseUrl }) {
         return baseUrl;
      },
   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
