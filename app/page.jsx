import Header from "@/components/Header";

const getPostsData = async ({ code }) => {
   const data = {
      code,
      grant_type: "authorization_code",
      client_id: process.env.PATREON_CLIENT_ID,
      client_secret: process.env.PATREON_CLIENT_SECRET,
      redirect_uri: "https://www.nightmarecarvings.com",
   };

   const res = await fetch("https://www.patreon.com/api/oauth2/token", {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
   });
   return res.json();
};

export default async function Home({ searchParams }) {
   const token = await getPostsData(searchParams.code);
   console.log(token);

   return (
      <>
         <Header />
      </>
   );
}
