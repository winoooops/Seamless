import { NextResponse } from "next/server";
import { coingeckoGETResponse, loadConfig } from "../_utils";

export async function GET() {
  try {
    const { baseUrl, apiKey } = loadConfig();

    const data = await coingeckoGETResponse(
      baseUrl + "/simple/supported_vs_currencies",
      apiKey,
      { revalidate: false },
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
