import { sanityClient } from "sanity:client";
import { FaqSchema, type Faq } from "./schemas/FAQSchema";
import {
  OpeningHoursSchema,
  type OpeningHours,
} from "./schemas/OpeningHoursSchema";
import { OrderTermsSchema, type OrderTerms } from "./schemas/OrderTermsSchema";

export async function fetchOpeningHours(): Promise<OpeningHours> {
  const groqJson = await sanityClient.fetch(
    `*[_type == "opening-hours" && setId.current == "default"]{title, hours, irregular}`
  );
  const openingHours = OpeningHoursSchema.parse(groqJson);

  // Filter out any irregular opening hours that are in the past
  if (openingHours.irregular) {
    const now = new Date();

    openingHours.irregular = openingHours.irregular.filter((irregular) => {
      return new Date(irregular.date) >= now;
    });
  }

  return openingHours;
}

export async function fetchFaq(): Promise<Faq> {
  const groqJson = await sanityClient.fetch(
    `*[_type == "faq"]{question, answer}`
  );
  const faq = FaqSchema.parse(groqJson);

  return faq;
}

export async function fetchOrderTerms(): Promise<OrderTerms> {
  const groqJson = await sanityClient.fetch(
    `*[_type == "orderTerms"]{title, content, sortOrder} | order(sortOrder asc) `
  );
  const orderTerms = OrderTermsSchema.parse(groqJson);

  return orderTerms;
}
