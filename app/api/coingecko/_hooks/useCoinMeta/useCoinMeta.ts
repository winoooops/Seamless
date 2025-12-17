import useSWR from "swr";
import { z } from "zod";

const LocalizedStringSchema = z.record(z.string(), z.string().nullable());

const ImageSchema = z.object({
  thumb: z.string(),
  small: z.string(),
  large: z.string(),
});

const MarketDataSchema = z.object({
  current_price: z.record(z.string(), z.number()),
  total_value_locked: z.number().nullable(),
  mcap_to_tvl_ratio: z.number().nullable(),
  fdv_to_tvl_ratio: z.number().nullable(),
  roi: z
    .object({
      times: z.number(),
      currency: z.string(),
      percentage: z.number(),
    })
    .nullable()
    .optional(), // ROI can be null
  ath: z.record(z.string(), z.number()),
  ath_change_percentage: z.record(z.string(), z.number()),
  ath_date: z.record(z.string(), z.string()),
  atl: z.record(z.string(), z.number()),
  atl_change_percentage: z.record(z.string(), z.number()),
  atl_date: z.record(z.string(), z.string()),
  market_cap: z.record(z.string(), z.number()),
  market_cap_rank: z.number().nullable(),
  fully_diluted_valuation: z.record(z.string(), z.number()),
  market_cap_fdv_ratio: z.number().nullable(),
  total_volume: z.record(z.string(), z.number()),
  high_24h: z.record(z.string(), z.number()),
  low_24h: z.record(z.string(), z.number()),
  price_change_24h: z.number(),
  price_change_percentage_24h: z.number(),
  price_change_percentage_7d: z.number(),
  price_change_percentage_14d: z.number(),
  price_change_percentage_30d: z.number(),
  price_change_percentage_60d: z.number(),
  price_change_percentage_200d: z.number(),
  price_change_percentage_1y: z.number(),
  market_cap_change_24h: z.number(),
  market_cap_change_percentage_24h: z.number(),
  price_change_24h_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_1h_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_24h_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_7d_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_14d_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_30d_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_60d_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_200d_in_currency: z.record(z.string(), z.number()),
  price_change_percentage_1y_in_currency: z.record(z.string(), z.number()),
  market_cap_change_24h_in_currency: z.record(z.string(), z.number()),
  market_cap_change_percentage_24h_in_currency: z.record(
    z.string(),
    z.number(),
  ),
  total_supply: z.number().nullable(),
  max_supply: z.number().nullable(),
  circulating_supply: z.number(),
  last_updated: z.string(),
});

const LinksSchema = z.object({
  homepage: z.array(z.string()),
  whitepaper: z.string().nullable().optional(),
  blockchain_site: z.array(z.string()),
  official_forum_url: z.array(z.string()),
  chat_url: z.array(z.string()),
  announcement_url: z.array(z.string()),
  twitter_screen_name: z.string().nullable(),
  facebook_username: z.string().nullable(),
  bitcointalk_thread_identifier: z.any().nullable(), // Could be number or string or null
  telegram_channel_identifier: z.string().nullable(),
  subreddit_url: z.string().nullable(),
  repos_url: z.record(z.string(), z.array(z.string())),
});

const TickerSchema = z.object({
  base: z.string(),
  target: z.string(),
  market: z.object({
    name: z.string(),
    identifier: z.string(),
    has_trading_incentive: z.boolean(),
  }),
  last: z.number(),
  volume: z.number(),
  converted_last: z.record(z.string(), z.number()),
  converted_volume: z.record(z.string(), z.number()),
  trust_score: z.string().nullable(),
  bid_ask_spread_percentage: z.number().nullable(),
  timestamp: z.string(),
  last_traded_at: z.string(),
  last_fetch_at: z.string(),
  is_anomaly: z.boolean(),
  is_stale: z.boolean(),
  trade_url: z.string().nullable(),
  token_info_url: z.string().nullable(),
  coin_id: z.string(),
  target_coin_id: z.string().optional(),
});

export const CoinMetaSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  web_slug: z.string().nullable().optional(),
  asset_platform_id: z.any().nullable(),
  platforms: z.record(z.string(), z.string().nullable()),
  detail_platforms: z.record(
    z.string(),
    z.object({
      decimal_place: z.number().nullable(),
      contract_address: z.string().nullable(),
    }),
  ),
  block_time_in_minutes: z.number().nullable(),
  hashing_algorithm: z.string().nullable(),
  categories: z.array(z.string()),
  public_notice: z.any().nullable(),
  additional_notices: z.array(z.any()),
  localization: LocalizedStringSchema,
  description: LocalizedStringSchema,
  links: LinksSchema,
  image: ImageSchema,
  country_origin: z.string().nullable(),
  genesis_date: z.string().nullable(),
  sentiment_votes_up_percentage: z.number().nullable(),
  sentiment_votes_down_percentage: z.number().nullable(),
  watchlist_portfolio_users: z.number().nullable(),
  market_cap_rank: z.number().nullable(),
  market_data: MarketDataSchema,
  status_updates: z.array(z.any()),
  last_updated: z.string(),
  tickers: z.array(TickerSchema).optional(),
});

export type CoinMeta = z.infer<typeof CoinMetaSchema>;

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => CoinMetaSchema.parse(data));

const useCoinMeta = (id: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/coingecko/coins/${id}`, // Assuming this is the correct endpoint path
    fetcher,
  );

  if (error) {
    console.error(error);
  }

  return {
    data,
    error,
    isLoading,
  };
};

export default useCoinMeta;
