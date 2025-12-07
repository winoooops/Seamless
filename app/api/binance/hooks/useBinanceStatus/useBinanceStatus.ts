import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useBinanceStatus = () => {
  const { data, mutate } = useSWR('/api/binance', fetcher, { refreshInterval: 5000 });
  return {
    isConnected: data?.status === 'initialized',
    timestamp: data?.timestamp,
    mutate
  };
};



export default useBinanceStatus;
