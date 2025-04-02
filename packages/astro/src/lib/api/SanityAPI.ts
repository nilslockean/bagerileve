import type { ISanityClient } from "@lib/types/ISanityClient";
import {
  OrderTermsSchema,
  type OrderTerms,
} from "@lib/schemas/OrderTermsSchema";
import { FaqSchema, type Faq } from "@lib/schemas/FAQSchema";
import {
  OpeningHoursSchema,
  type OpeningHours,
} from "@lib/schemas/OpeningHoursSchema";
import { capitalize } from "@lib/stringUtils";

export class SanityAPI {
  private client: ISanityClient;
  private assetBaseUrl = "https://cdn.sanity.io/files";
  private projectId = "mz20cm4o";
  private dataset = "production";
  private _now?: Date;

  constructor(client: ISanityClient, projectId?: string, dataset?: string) {
    this.client = client;

    if (projectId) {
      this.projectId = projectId;
    }

    if (dataset) {
      this.dataset = dataset;
    }
  }

  public get now(): Date {
    return this._now ?? new Date();
  }

  public set now(value: Date | undefined) {
    this._now = value;
  }

  private get today(): Date {
    const now = new Date(this.now);
    now.setHours(0, 0, 0, 0);

    return now;
  }

  public getAsset(filename: string): string {
    return `${this.assetBaseUrl}/${this.projectId}/${this.dataset}/${filename}`;
  }

  public async getOrderTerms(): Promise<OrderTerms> {
    const groqJson = await this.client.fetch(
      `*[_type == "orderTerms"]{title, content, sortOrder} | order(sortOrder asc) `
    );
    const orderTerms = OrderTermsSchema.parse(groqJson);
    return orderTerms;
  }

  public async getFaq(): Promise<Faq> {
    const groqJson = await this.client.fetch(
      `*[_type == "faq"] {question, answer}`
    );
    const faq = FaqSchema.parse(groqJson);
    return faq;
  }

  public async getOpeningHours(): Promise<OpeningHours> {
    const groqJson = await this.client.fetch(
      `*[_type == "opening-hours" && setId.current == "default"]{title, irregular, hours}`
    );
    const openingHours = OpeningHoursSchema.parse(groqJson);
    // Filter out any irregular opening hours that are in the past
    if (openingHours.irregular) {
      openingHours.irregular = openingHours.irregular
        .filter((irregular) => {
          // Compare start of day to include irregular hours that start today
          const irregularDate = new Date(irregular.date);
          irregularDate.setHours(0, 0, 0, 0);

          return new Date(irregular.date) >= this.today;
        })
        .sort((a, b) => {
          if (a.date === b.date) {
            return 0;
          }

          return a.date < b.date ? -1 : 1;
        })
        .map((irregular) => {
          if (irregular.formattedDate) {
            return irregular;
          }

          const formatter = new Intl.DateTimeFormat("sv-SE", {
            dateStyle: "full",
          });
          const formattedDate = formatter.format(new Date(irregular.date));
          irregular.formattedDate = capitalize(formattedDate);

          return irregular;
        });
    }

    return openingHours;
  }
}
