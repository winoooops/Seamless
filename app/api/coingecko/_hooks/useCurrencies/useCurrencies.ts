import useSWR from "swr";

export const fetcher = async (url: string) =>
  fetch(url).then((res) => res.json());

const useCurrencies = () => {
  const { data, error } = useSWR("/api/coingecko/currencies", fetcher);
  if (error) {
    console.error(error);
  }

  return data;
};

export default useCurrencies;
