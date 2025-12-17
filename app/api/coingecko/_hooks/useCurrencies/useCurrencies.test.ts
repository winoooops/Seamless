import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import useCurrencies, { fetcher } from "./useCurrencies";

vi.mock("swr");
const useSWRMock = vi.mocked(useSWR);

describe("useCurrencies", () => {
  test("returns list of supported currencies", () => {
    const data = ["btc", "eth", "usd", "cny", "jpy"];
    useSWRMock.mockReturnValue({ data } as ReturnType<typeof useSWR>);

    const { result } = renderHook(() => useCurrencies());

    expect(useSWRMock).toHaveBeenCalledWith(
      "/api/coingecko/currencies",
      fetcher,
    );

    expect(result.current.data).toEqual(data);
  });
});
