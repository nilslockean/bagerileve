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
import { getDatesInRange } from "@lib/dateUtils";
import type { OrderSnapshot } from "@lib/schemas/OrderSnapshot";

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

  public async query(query: string): Promise<unknown> {
    const groqJson = await this.client.fetch(query);
    return groqJson;
  }

  public async getOpeningHours(): Promise<OpeningHours> {
    const groqJson = await this.client.fetch(
      `*[_type == "opening-hours" && setId.current == "default"]{title, irregular, days}`
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

  public async getOpenDaysInRange(start: string, end: string) {
    const datesInRange = getDatesInRange(start, end);
    const openingHours = await this.getOpeningHours();
    const closedWeekdays = Object.values(openingHours.days)
      .filter(({ closed }) => closed)
      .map(({ day }) => day);
    const closedHolidays = (openingHours.irregular || [])
      .filter(({ closed }) => closed)
      .map(({ date }) => date);

    return datesInRange.filter((dateStr) => {
      // Filter out closed irregular opening hours first
      if (closedHolidays.includes(dateStr)) {
        return false;
      }

      // Check if the weekday index of current date is in list of closed weekdays
      const date = new Date(dateStr);
      const weekday = date.getDay();
      return !closedWeekdays.includes(weekday);
    });
  }

  private generateOrderNumber(baseDate = new Date()): string {
    const y = baseDate.getFullYear().toString().slice(-2);
    const m = String(baseDate.getMonth() + 1).padStart(2, "0");
    const d = String(baseDate.getDate()).padStart(2, "0");

    // 4 random digits
    const rand = Math.floor(1000 + Math.random() * 9000);

    return `${y}${m}${d}-${rand}`;
  }

  public createOrder = async (orderSnapshot: OrderSnapshot) => {
    const { customer, pickupDate, items, totals } = orderSnapshot;

    if (!this.client.create) {
      throw new Error("Create method not available in Sanity client instance");
    }

    const order = await this.client.create({
      _type: "order",
      orderNumber: this.generateOrderNumber(),
      customer,
      pickupDate,
      totals,
      items: items.map((item) => ({
        _key: crypto.randomUUID(), // 👈 required
        ...item,
      })),
    });

    return order;
  };
}
