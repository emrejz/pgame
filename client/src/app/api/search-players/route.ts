import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const response = await fetch(
      process.env.BE_URL + "/players/search/" + username,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
