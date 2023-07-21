import Header from "@/components/Header";

export default async function Home({ searchParams }) {
   console.log(searchParams.code);

   return <Header />;
}
