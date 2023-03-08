import type { Period } from "lastfm-client-ts";

export const formatDate = (date: Date, locale = "es-ES", options?: Intl.DateTimeFormatOptions) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const _options = options || defaultOptions;
  const now = new Date(date).toLocaleDateString(locale, _options);

  return now;
};

export const convertDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  return formatDate(date, "en-US");
};

export const convertPeriod = (period: Period) => {
  switch (period) {
    case "overall":
      return "all time";
    case "7day":
      return "last week";
    case "1month":
      return "last month";
    case "3month":
      return "last three months";
    case "6month":
      return "last six months";
    case "12month":
      return "last year";
    default:
      return "all time";
  }
};
