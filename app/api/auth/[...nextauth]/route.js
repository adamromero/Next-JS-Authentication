import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import PatreonProvider from "next-auth/providers/patreon";

const handler = NextAuth({
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
   callbacks: {
      async jwt(token, user) {
         if (user) {
            token.accessToken = user.accessToken;
         }
         return token;
      },
      async session(session, token) {
         session.accessToken = token.accessToken;
         return session;
      },
   },
});

export { handler as GET, handler as POST };
