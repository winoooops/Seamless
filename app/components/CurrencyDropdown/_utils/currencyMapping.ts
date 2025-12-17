export const CURRENCY_TO_COUNTRY_MAP: Record<string, string> = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  CNY: "cn",
  KRW: "kr",
  INR: "in",
  CAD: "ca",
  AUD: "au",
  BRL: "br",
  IDR: "id",
  RUB: "ru",
  TRY: "tr",
  SGD: "sg",
  CHF: "ch",
  MXN: "mx",
  HKD: "hk",
  NZD: "nz",
  SEK: "se",
  NOK: "no",
  DKK: "dk",
  PLN: "pl",
  THB: "th",
  HUF: "hu",
  CZK: "cz",
  ILS: "il",
  CLP: "cl",
  PHP: "ph",
  AED: "ae",
  COP: "co",
  SAR: "sa",
  MYR: "my",
  RON: "ro",
  VND: "vn",
  ARS: "ar",
  TWD: "tw",
  ZAR: "za",
};

export const getFiatFlagUrl = (symbol: string) => {
  const countryCode = CURRENCY_TO_COUNTRY_MAP[symbol.toUpperCase()];
  if (countryCode) {
    return `https://cdn.jsdelivr.net/gh/hatscripts/circle-flags/flags/${countryCode}.svg`;
  }
  return "";
};
