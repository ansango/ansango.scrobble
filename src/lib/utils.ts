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
