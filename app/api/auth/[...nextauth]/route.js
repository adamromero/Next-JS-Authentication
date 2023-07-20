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
         id: "patreon",
         name: "PATREON",
         type: "oauth",
         version: "2.0",
         scope: "users pledges-to-me my-campaign",
         params: { grant_type: "authorization_code" },
         redirectUrl: "https://www.nightmarecarvings.com",
         authorizationUrl: `${process.env.PATREON_AUTHORIZE_URL}?response_type=code`,
         accessTokenUrl: `${process.env.PATREON_TOKEN_URL}`,
         profileUrl: `${process.env.PATREON_PROFILE_URL}`,
         profile: (profile) => {
            return {
               id: profile.data.id,
               name: profile.data.attributes.full_name,
               email: profile.data.attributes.email,
            };
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
