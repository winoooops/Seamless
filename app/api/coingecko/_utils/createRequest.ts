import { NextResponse } from "next/server";

export async function coingeckoGETResponse(
  url: string,
  apiKey: string,
  next?: NextFetchRequestConfig,
  nextErrorMsg?: string,
) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-cg-pro-api-key": apiKey,
    },
    next,
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: nextErrorMsg || "Upstream Error" },
      { status: res.status },
    );
  }

  return await res.json();
}
