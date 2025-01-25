import { NextResponse } from "next/server";

const extractTitle = (input) => {
   const match = input.match(/^(.*?) \((\d{4})\)/);
   return match ? match[1] : "";
};

const extractYear = (input) => {
   const match = input.match(/^(.*?) \((\d{4})\)/);
   return match ? match[2] : "";
};

export async function POST(req, res) {
   const request = await req.json();
   const { title, url, published_at } = request.data.attributes;

   if (title.includes("Full Length Reaction")) {
      const extractedTitle = extractTitle(title).trim();
      const year = extractYear(title).trim();
      if (extractedTitle) {
         //query mongodb movies collection using parsedTitle and year
         //check that the data.Type is "movie"
         //check that the document properties !hasReacted and !hasSeen
         //set hasReacted to true
         //set links.patreon to url
         //set publishedAt to published_at
         if (year) {
            // await Movie.find(
            //    {
            //       "data.Title": extractedTitle,
            //       "data.Year": year,
            //       "data.Type": "movie",
            //       hasReacted: false,
            //       hasSeen: false,
            //    },
            //    {
            //       $set: {
            //          hasReacted: true,
            //          "links.patreon": url,
            //          publishedAt: published_at,
            //       },
            //    }
            // );
            console.log({
               title: extractedTitle,
               year,
               url,
               published_at,
               type: "movie",
            });
         } else {
            //query query mongodb movies collection using parsedTitle
            //check that the data.Type is "tv"
            //check that the document properties !hasReacted and !hasSeen
            //set hasReacted to true
            //set links.patreon to url
            //set publishedAt to published_at
            // await Movie.find(
            //    {
            //       "data.Title": extractedTitle,
            //       "data.Type": "tv",
            //       hasReacted: false,
            //       hasSeen: false,
            //    },
            //    {
            //       $set: {
            //          hasReacted: true,
            //          "links.patreon": url,
            //          publishedAt: published_at,
            //       },
            //    }
            // );
            console.log({
               title: extractedTitle,
               url,
               published_at,
               type: "tv",
            });
         }
      }
   }

   return NextResponse.json({
      message: "hello there",
   });
}
