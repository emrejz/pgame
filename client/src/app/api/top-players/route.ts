import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(process.env.BE_URL + "/players/top", {
      method: "GET",
    });
    const data = await response.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Something went wrong" },
      { status: 500 }
    );
  }
}
