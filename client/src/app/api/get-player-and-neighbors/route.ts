import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const response = await fetch(
      "http://localhost:3001/players/neighbors/" + id,
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
