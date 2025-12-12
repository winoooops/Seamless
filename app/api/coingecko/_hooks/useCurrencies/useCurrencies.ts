import useSWR from "swr";
import * as z from "zod";

const schema = z.array(
  z.object({
    value: z.string(),
    label: z.string(),
  }),
);

type Schema = z.infer<typeof schema>;

export const fetcher = async (url: string): Promise<Schema> =>
  fetch(url)
    .then((res) => res.json())
    .then((data) =>
      schema.parse(data.map((item: string) => ({ value: item, label: item }))),
    );

const useCurrencies = (): Awaited<ReturnType<typeof fetcher>> => {
  const { data, error } = useSWR("/api/coingecko/currencies", fetcher);
  if (error) {
    console.error(error);
  }

  return data ?? [];
};

export default useCurrencies;
