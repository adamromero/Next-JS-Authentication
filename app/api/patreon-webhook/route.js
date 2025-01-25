import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

const extractTitle = (input) => {
   const match = input.match(/^(.*?)(?: \((\d{4})\)| S\d{2}E\d{2})/);
   return match ? match[1].trim() : "";
};

const extractYear = (input) => {
   const match = input.match(/^(.*?) \((\d{4})\)/);
   return match ? match[2].trim() : "";
};

export async function POST(req) {
   try {
      const request = await req.json();
      const { title, url, published_at } = request.data.attributes;

      if (!title || !url || !published_at) {
         return NextResponse.json({ error: "Invalid input" }, { status: 400 });
      }

      if (title.includes("Full Length Reaction")) {
         const extractedTitle = extractTitle(title);
         const year = extractYear(title);

         if (extractedTitle) {
            const filter = year
               ? {
                    "data.Title": extractedTitle,
                    "data.Year": year,
                    "data.Type": "movie",
                    hasReacted: false,
                    hasSeen: false,
                 }
               : {
                    "data.Title": extractedTitle,
                    "data.Type": "tv",
                    hasReacted: false,
                    hasSeen: false,
                 };

            const update = {
               $set: {
                  hasReacted: true,
                  "links.patreon": url,
                  publishedAt: published_at,
               },
            };

            const result = await Movie.updateOne(filter, update);

            if (result.modifiedCount > 0) {
               return NextResponse.json({
                  message: "Document updated successfully",
               });
            } else {
               return NextResponse.json(
                  { message: "No matching document found" },
                  { status: 404 }
               );
            }
         }
      }

      return NextResponse.json(
         { message: "No action performed" },
         { status: 200 }
      );
   } catch (error) {
      console.error(error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}
