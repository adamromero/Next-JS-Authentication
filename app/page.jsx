import Header from "@/components/Header";

export default async function Home({ searchParams }) {
   let user;
   if (searchParams.code) {
      const authorizationCode = searchParams.code;
      const clientId = process.env.PATREON_CLIENT_ID;
      const clientSecret = process.env.PATREON_CLIENT_SECRET;
      const redirectUri = process.env.PATREON_REDIRECT_URI;
      const tokenUrl = "https://www.patreon.com/api/oauth2/token";

      const data = new URLSearchParams();
      data.append("code", authorizationCode);
      data.append("grant_type", "authorization_code");
      data.append("client_id", clientId);
      data.append("client_secret", clientSecret);
      data.append("redirect_uri", redirectUri);

      fetch(tokenUrl, {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
         body: data,
      })
         .then((response) => response.json())
         .then((tokenData) => {
            console.log("token:", tokenData);
            const accessToken = tokenData.access_token;

            fetch("https://www.patreon.com/api/oauth2/api/current_user", {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            })
               .then((res) => res.json())
               .then((userData) => {
                  localStorage.setItem("user", userData);
               });
         })
         .catch((error) => {
            console.log("Token exchange failed.. Error:", error);
         });
   }

   return (
      <>
         <Header />
         <div>{user}</div>
      </>
   );
}
