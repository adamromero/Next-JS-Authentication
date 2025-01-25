import { NextResponse } from "next/server";

const parseMovieTitleAndYear = (input) => {
   const match = input.match(/^(.*?) \((\d{4})\)/);
   if (match) {
      const parsedTitle = match[1];
      const year = match[2];
      return { parsedTitle, year };
   }
   return null;
};

export async function POST(req, res) {
   const request = await req.json();
   const { title, url, published_at } = request.data.attributes;

   if (title.includes("Full Length")) {
      const { parsedTitle, year } = parseMovieTitleAndYear(title);
      console.log(
         `title: ${parsedTitle}, year: ${year}, url: ${url}, published_at: ${published_at}`
      );
   }

   return NextResponse.json({
      message: "hello there",
   });
}
