import { SiteLanguage } from "src/config";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toLocaleDateString(date: Date, locale = SiteLanguage.SV) {
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Europe/Tallinn",
  });
}

export function toLocaleTimeString(date: Date, locale = SiteLanguage.SV) {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Tallinn",
  });
}

export function prettyCourseDates(
  start: Date,
  end?: Date,
  locale = SiteLanguage.SV
) {
  const startDateString = toLocaleDateString(start, locale);
  const endDateString = toLocaleDateString(end ?? start, locale);
  const yearString = start.getFullYear().toString();

  if (startDateString === endDateString || end === undefined) {
    const endTimeString = end && toLocaleTimeString(end, locale);

    return capitalize(
      `${startDateString} ${yearString} kl. ${toLocaleTimeString(start, locale)}${
        endTimeString && start !== end && endTimeString !== "23:59"
          ? ` - ${endTimeString}`
          : ""
      }`
    );
  }

  return capitalize(`${startDateString} - ${endDateString} ${yearString}`);
}

const currenyFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(prices: number[]) {
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // The currency formatter likes the &nbsp; character. I don't.
  const formattedPrice = currenyFormatter
    .format(minPrice)
    .replace(/\u00A0/g, " ");

  if (minPrice === maxPrice) {
    return formattedPrice;
  }

  return "Från " + formattedPrice;
}
