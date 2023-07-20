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
         authorization: {
            //url: `${process.env.PATREON_AUTHORIZE_URL}?response_type=code`,
            params: {
               redirect_uri: "https://www.nightmarecarvings.com",
               scope: "identity identity.memberships",
               grant_type: "authorization_code",
            },
         },
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
