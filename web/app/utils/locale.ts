const locale = "en-GB";

const percentFormatter = Intl.NumberFormat(locale, {
  style: "percent",
  roundingMode: "trunc",
});

export const formatPercent = (value: number) => {
  return percentFormatter.format(value);
};

const dateFormatter = Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
});

export const formatDate = (date: Date) => {
  return dateFormatter.format(date);
};

const usdFormatter = Intl.NumberFormat(locale, {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
});

export const formatUsd = (value: number) => {
  return usdFormatter.format(value);
};
