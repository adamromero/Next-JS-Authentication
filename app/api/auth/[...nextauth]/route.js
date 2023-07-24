import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import PatreonProvider from "next-auth/providers/patreon";

const handler = NextAuth({
   providers: [
      // GithubProvider({
      //    clientId: process.env.GITHUB_CLIENT_ID,
      //    clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // }),
      // PatreonProvider({
      //    clientId: process.env.PATREON_CLIENT_ID,
      //    clientSecret: process.env.PATREON_CLIENT_SECRET,
      //    authorization: {
      //       params: {
      //          redirect_uri: "https://www.nightmarecarvings.com",
      //          scope: "identity identity.memberships",
      //          grant_type: "authorization_code",
      //       },
      //    },
      // }),
      {
         id: "patreon",
         name: "PATREON",
         type: "oauth",
         version: "2.0",
         authorization: {
            url: `${process.env.PATREON_AUTHORIZE_URL}?response_type=code`,
            params: {
               redirect_uri: "https://www.nightmarecarvings.com",
               scope: "identity identity[email] identity.memberships",
               grant_type: "authorization_code",
            },
         },
         token: {
            url: `${process.env.PATREON_TOKEN_URL}`,
         },
         userinfo: {
            url: `${process.env.PATREON_PROFILE_URL}`,
         },
         profile: (profile) => {
            return {
               id: profile.data.id,
               name: profile.data.attributes.full_name,
               email: profile.data.attributes.email,
               provider: "PATREON",
            };
         },
         clientId: process.env.PATREON_CLIENT_ID,
         clientSecret: process.env.PATREON_CLIENT_SECRET,
      },
   ],
});

export { handler as GET, handler as POST };
