import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.COINGECKO_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("COINGECKO_API_BASE_URL not found");
  }

  const apiKey = process.env.COINGECKO_API_SECRET;
  if (!apiKey) {
    throw new Error("COINGECKO_API_SECRET not found");
  }

  try {
    const finalUrl = baseUrl + "/simple/supported_vs_currencies";

    const res = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "x-cg-pro-api-key": apiKey,
      },
      next: {
        revalidate: false,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream Error" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
