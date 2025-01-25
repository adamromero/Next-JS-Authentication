import { NextResponse } from "next/server";

export async function POST(req, res) {
   const request = req;
   console.log(request);
   console.log(request.body);
   return NextResponse.json({
      message: "hello there",
   });
}
