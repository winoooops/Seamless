const formatMoney = (
  value: number,
  { locale, currency }: { locale: string; currency: string },
) => {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default formatMoney;
