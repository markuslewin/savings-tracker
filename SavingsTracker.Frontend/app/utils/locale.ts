// Assume british locale to match the design
export const locale = "en-GB";

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

const monthFormatter = Intl.DateTimeFormat(locale, {
  month: "short",
});

export const formatMonth = (date: Date) => {
  return monthFormatter.format(date);
};

const centsFormatter = Intl.NumberFormat(locale, {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  trailingZeroDisplay: "stripIfInteger",
});

export const formatDollars = (value: number) => {
  return centsFormatter.format(value);
};
