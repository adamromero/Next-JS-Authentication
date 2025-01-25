import { NextResponse } from "next/server";

export async function POST(req, res) {
   return NextResponse.json({
      message: "the webhook has been triggered by publishing a post!",
   });
}
