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
         const response = await fetch(process.env.PATREON_PROFILE_URL, {
            headers: {
               Authorization: `Bearer ${token.accessToken}`,
            },
         });
         const user = await response.json();

         //patreon
         if (user) {
            //const { first_name } = user.data.attributes;
            const id = user.data;
            const firstName = "Wilford";
            session.user.firstName = firstName;
         }

         //github
         // if (user) {
         //    const { following } = user;
         //    session.user.following = following;
         // }

         return session;
      },
   },
});

export { handler as GET, handler as POST };
