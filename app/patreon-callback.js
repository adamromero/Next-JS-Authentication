import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";

const PatreonCallbackPage = () => {
   const router = useRouter();
   const { code } = router.query;

   useEffect(() => {
      // Check if code exists in the URL query parameters
      if (code) {
         // Use NextAuth's signIn function to exchange the code for an access token
         signIn("patreon", {
            code,
            callbackUrl: `${window.location.origin}/patreon-callback`, // Replace with your actual callback URL
         });
      }
   }, [code]);

   return <div>Signing in...</div>;
};

export default PatreonCallbackPage;
