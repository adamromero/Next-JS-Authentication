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
         authorization: {
            url: process.env.PATREON_AUTHORIZE_URL,
            params: {
               redirect_uri: "https://www.nightmarecarvings.com",
               scope: "identity identity.memberships",
               grant_type: "authorization_code",
            },
         },
         token: process.env.PATREON_TOKEN_URL,
      }),
   ],
});

export { handler as GET, handler as POST };
