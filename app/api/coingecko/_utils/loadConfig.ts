export function loadConfig(): { baseUrl: string; apiKey: string } {
  const baseUrl = process.env.COINGECKO_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("COINGECKO_API_BASE_URL not found");
  }

  const apiKey = process.env.COINGECKO_API_SECRET;
  if (!apiKey) {
    throw new Error("COINGECKO_API_SECRET not found");
  }

  return { baseUrl, apiKey };
}
