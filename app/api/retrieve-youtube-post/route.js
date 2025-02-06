import { NextResponse } from "next/server";
import xml2js from "xml2js";

export async function POST(req) {
   try {
      const xmlData = await req.text();

      const parser = new xml2js.Parser({ explicitArray: false });
      const jsonData = await parser.parseStringPromise(xmlData);

      const entry = jsonData?.feed?.entry;
      if (!entry) {
         console.log("No new video entry found.");
         return NextResponse.json(
            { message: "No video entry found" },
            { status: 400 }
         );
      }

      const videoId = entry["yt:videoId"];
      const title = entry["title"];
      const description = entry["media:group"]["media:description"];

      console.log(`New Video Uploaded!`);
      console.log(`Video ID: ${videoId}`);
      console.log(`Title: ${title}`);
      console.log(`Description: ${description}`);

      return NextResponse.json(
         { message: "Notification received" },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error processing YouTube notification:", error);
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
   }
}

// Optional GET handler for verifying subscription challenge
export async function GET(req) {
   const { searchParams } = new URL(req.url);
   const hubChallenge = searchParams.get("hub.challenge");

   if (hubChallenge) {
      return new Response(hubChallenge, { status: 200 });
   }

   return NextResponse.json({ message: "Missing challenge" }, { status: 400 });
}
