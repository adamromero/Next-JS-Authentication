import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import PatreonProvider from "next-auth/providers/patreon";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      PatreonProvider({
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
         authorization: {
            params: {
               scope: "identity identity[email] identity.memberships",
            },
         },
      }),
   ],
   adapter: MongoDBAdapter(clientPromise),
   session: {
      strategy: "jwt",
   },
   jwt: {
      secret: process.env.JWT_SECRET,
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
         if (token) {
            session.user.id = token.id;
         }
         return session;
      },
   },
});

export { handler as GET, handler as POST };
