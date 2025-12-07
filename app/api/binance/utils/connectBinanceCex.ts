const connectBinanceCex = async (apiKey?: string, apiSecret?: string) => {
  try {
    const payload: any = { isTestnet: true };
    if (apiKey) payload.apiKey = apiKey;
    if (apiSecret) payload.apiSecret = apiSecret;

    const res = await fetch("/api/binance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to connect');
    }

    return { isConnected: true, timestamp: new Date().toISOString() };
  } catch (e) {
    console.error("Connection failed", e);
    throw e;
  }
};

export default connectBinanceCex;