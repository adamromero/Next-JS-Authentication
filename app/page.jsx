import Header from "@/components/Header";

export default async function Home({ searchParams }) {
   return (
      <>
         Date: {new Date().toString()}
         <Header />
      </>
   );
}
