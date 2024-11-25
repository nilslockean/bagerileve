import type { ISanityClient } from "@lib/types/ISanityClient";
import { SiteLanguage } from "src/config";
import {
  OrderTermsSchema,
  type OrderTerms,
} from "@lib/schemas/OrderTermsSchema";
import { FaqSchema, type Faq } from "@lib/schemas/FAQSchema";
import {
  OpeningHoursSchema,
  type OpeningHours,
} from "@lib/schemas/OpeningHoursSchema";

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

  public set now(value: Date) {
    this._now = value;
  }

  public getAsset(filename: string): string {
    return `${this.assetBaseUrl}/${this.projectId}/${this.dataset}/${filename}`;
  }

  public async getOrderTerms(language = SiteLanguage.SV): Promise<OrderTerms> {
    const groqJson = await this.client.fetch(
      `*[_type == "orderTerms" && language == "${language}"]{title, content, sortOrder} | order(sortOrder asc) `
    );
    const orderTerms = OrderTermsSchema.parse(groqJson);
    return orderTerms;
  }

  public async getFaq(language = SiteLanguage.SV): Promise<Faq> {
    const groqJson = await this.client.fetch(
      `*[_type == "faq" && language == "${language}"]{question, answer}`
    );
    const faq = FaqSchema.parse(groqJson);
    return faq;
  }

  public async getOpeningHours(
    language = SiteLanguage.SV
  ): Promise<OpeningHours> {
    const groqJson = await this.client.fetch(
      `*[_type == "opening-hours" && setId.current == "default"]{title, irregular, "hours": hours[]{"day": day.${language}, "time": time.${language}}}`
    );
    const openingHours = OpeningHoursSchema.parse(groqJson);

    // Filter out any irregular opening hours that are in the past
    if (openingHours.irregular) {
      openingHours.irregular = openingHours.irregular
        .filter((irregular) => {
          return new Date(irregular.date) >= this.now;
        })
        .sort((a, b) => {
          if (a.date === b.date) {
            return 0;
          }

          return a.date < b.date ? -1 : 1;
        });
    }

    return openingHours;
  }
}
