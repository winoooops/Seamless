import { NextResponse } from 'next/server';
import { binanceService } from '@/lib/binance-service';

export async function POST(request: Request) {
  try {
    let { apiKey, apiSecret, isTestnet } = await request.json();

    // Fallback to server-side env vars if not provided in body
    if (!apiKey) apiKey = process.env.BINANCE_API_KEY;
    if (!apiSecret) apiSecret = process.env.BINANCE_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Missing API Key or Secret (not found in body or env vars)' },
        { status: 400 }
      );
    }

    await binanceService.initialize(apiKey, apiSecret, isTestnet ?? true);

    return NextResponse.json({ success: true, message: 'Binance User Data Stream Initialized' });
  } catch (error: any) {
    console.error('Error initializing Binance service:', error);
    return NextResponse.json(
      { error: 'Failed to initialize service', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const client = binanceService.getClient();
  return NextResponse.json({
    status: client ? 'initialized' : 'not_initialized',
    timestamp: new Date().toISOString()
  });
}
