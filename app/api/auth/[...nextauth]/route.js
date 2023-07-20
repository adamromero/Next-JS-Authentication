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
         userinfo: process.env.PATREON_PROFILE_URL,
         profile: (profile) => {
            return {
               id: profile.data.id,
               name: profile.data.attributes.full_name,
               image: profile.data.attributes.image_url,
            };
         },
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
