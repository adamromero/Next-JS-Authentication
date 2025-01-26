import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
   try {
      const movieVotes = await Movie.find();
      return NextResponse.json(movieVotes);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
         details: error.message,
      });
   }
}
