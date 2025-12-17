import { NextRequest, NextResponse } from "next/server";
import { coingeckoGETResponse, loadConfig } from "../../_utils";
// Note: Adjusted import to be relative or alias if needed. Checking _utils location.
// It was `../_utils` in the previous file. Since we are moving one level deeper, it should be `../../_utils`.

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { baseUrl, apiKey } = loadConfig();

    // According to Coingecko API: /coins/{id}
    const data = await coingeckoGETResponse(
      baseUrl +
        `/coins/${id}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`,
      apiKey,
      { revalidate: 3600 }, // Cache for 1 hour
    );
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
