import {
  WebsocketAPIClient,
  WS_KEY_MAP,
  DefaultLogger,
  isWsFormattedUserDataEvent,
  isWsFormattedSpotUserDataEvent,
  isWsFormattedSpotBalanceUpdate,
  isWsFormattedSpotOutboundAccountPosition,
  WebsocketClient,
  WsKey,
  WsFormattedMessage,
} from "binance";

// Global reference for caching the client instance in development
const globalForBinance = globalThis as unknown as {
  binanceClient: WebsocketAPIClient | undefined;
};

export class BinanceService {
  private static instance: BinanceService;
  private client: WebsocketAPIClient | undefined;
  private logger: DefaultLogger;

  private constructor() {
    this.logger = {
      trace: (...args) => console.log("[Binance Trace]", ...args),
      info: (...args) => console.log("[Binance Info]", ...args),
      error: (...args) => console.error("[Binance Error]", ...args),
    };
  }

  public static getInstance(): BinanceService {
    if (!BinanceService.instance) {
      BinanceService.instance = new BinanceService();
    }
    return BinanceService.instance;
  }

  public getClient(): WebsocketAPIClient | undefined {
    return this.client;
  }

  public async initialize(
    apiKey: string,
    apiSecret: string,
    isTestnet: boolean = true, // TODO: make it false once everything is ready
  ) {
    if (this.client) {
      this.logger.info("Binance client already initialized");
      return;
    }

    if (globalForBinance.binanceClient) {
      this.client = globalForBinance.binanceClient;
      this.logger.info("Reusing global Binance client");
      return;
    }

    this.logger.info("Initializing Binance Client...");

    this.client = new WebsocketAPIClient(
      {
        api_key: apiKey,
        api_secret: apiSecret,
        beautify: true,
        testnet: isTestnet,
        attachEventListeners: false,
      },
      this.logger,
    );

    // Attach event listeners
    this.attachEventHandlers(this.client.getWSClient());

    // Persist in global scope for dev environment
    if (process.env.NODE_ENV !== "production") {
      globalForBinance.binanceClient = this.client;
    }

    try {
      this.logger.info("Subscribing to User Data Stream...");
      // Subscribe to Spot User Data Stream
      const response = await this.client.subscribeUserDataStream(
        WS_KEY_MAP.mainWSAPI,
      );
      this.logger.info("User Data Stream Subscribed:", response);
    } catch (error) {
      this.logger.error("Failed to subscribe to User Data Stream:", error);
      throw error;
    }
  }

  private attachEventHandlers(wsClient: WebsocketClient) {
    wsClient.on(
      "open",
      ({
        wsKey,
      }: {
        wsKey: WsKey;
        event: any;
        wsUrl: string;
        ws: WebSocket;
      }) => {
        this.logger.info("WebSocket connected", wsKey);
      },
    );

    wsClient.on("reconnected", ({ wsKey }: { wsKey: WsKey; event: any }) => {
      this.logger.info("WebSocket reconnected", wsKey);
    });

    wsClient.on(
      "exception",
      ({
        wsKey,
        isWSAPIResponse,
      }: {
        wsKey: WsKey;
        isWSAPIResponse?: boolean;
      }) => {
        this.logger.error("WebSocket error", wsKey);
      },
    );

    wsClient.on("formattedMessage", (data: WsFormattedMessage) => {
      if (isWsFormattedSpotOutboundAccountPosition(data)) {
        this.logger.info("Spot Account Position Update:", data);
        return;
      }
      if (isWsFormattedSpotBalanceUpdate(data)) {
        this.logger.info("Spot Balance Update:", data);
        return;
      }
      if (isWsFormattedSpotUserDataEvent(data)) {
        this.logger.info("Spot User Data Event:", data);
        return;
      }
      if (isWsFormattedUserDataEvent(data)) {
        this.logger.info("General User Data Event:", data);
        return;
      }
      console.log("Other message:", data);
    });

    wsClient.on("close", ({ wsKey }: { wsKey: WsKey; event: any }) => {
      this.logger.info("should close ws connection", wsKey);
    });
  }
}

export const binanceService = BinanceService.getInstance();
