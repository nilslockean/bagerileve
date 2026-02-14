import config from "@config";
import { formatDay } from "@lib/openingHoursUtils";
import type { OrderSnapshot } from "@lib/schemas/OrderSnapshot";
import { formatPrice, toLocaleDateString } from "@lib/stringUtils";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import type { Personalization } from "mailersend/lib/modules/Email.module";

type Options = {
  apiKey: string;
  snapshot: OrderSnapshot;
  orderNr: string;
  createdAt: string;
  adminEmail: string;
  hostname: string;
};

export class MailerSendAPI {
  private client: MailerSend;
  private readonly snapshot: OrderSnapshot;
  private readonly orderNr: string;
  private readonly createdAt: string;
  private readonly adminEmail: string;
  private readonly hostname: string;
  private readonly ORDER_CONFIRMATION_TEMPLATE_ID = "o65qngk8d63gwr12";
  private readonly ADMIN_NOTIFICATION_TEMPLATE_ID = "pq3enl6exxr42vwr";

  constructor(options: Options) {
    const { apiKey, snapshot, createdAt, orderNr, adminEmail, hostname } =
      options;

    this.client = new MailerSend({
      apiKey,
    });

    this.snapshot = snapshot;
    this.orderNr = orderNr;
    this.createdAt = createdAt;
    this.adminEmail = adminEmail;
    this.hostname = hostname;
  }

  private getPersonalization(recipient: Recipient): Personalization[] {
    const { snapshot, createdAt, orderNr, adminEmail, hostname } = this;
    return [
      {
        email: recipient.email,
        data: {
          order: {
            ...snapshot,
            pickupDate: toLocaleDateString(new Date(snapshot.pickupDate)),
            items: snapshot.items.map((item) => ({
              ...item,
              productTitle:
                item.variantId !== "standard"
                  ? `${item.productTitle} - ${item.variantDescription}`
                  : item.productTitle,
              lineTotal: formatPrice([item.lineTotal]),
              quantity: `${item.quantity} st.`,
            })),
            totals: {
              tax: formatPrice([snapshot.totals.tax]),
              total: formatPrice([snapshot.totals.total]),
            },
          },
          createdAt: new Date(createdAt).toLocaleString("sv-SE", {
            timeZone: "Europe/Tallinn",
          }),
          orderNr,
          adminEmail,
          hostname,
          // customer: this.snapshot.customer,
          // order_customer_email: this.snapshot.customer.email,
          // order_number: this.orderNr,
          // support_phone: config.contact.phone,
          // support_email: config.contact.email,
          // order_pickup_date: this.snapshot.pickupDate,
          // created_at: this.createdAt,
        },
      },
    ];
  }

  public sendOrderConfirmation() {
    console.log("sending order confirmation...");
    const sentFrom = new Sender(this.adminEmail, config.siteTitle);

    const recipient = new Recipient(
      this.snapshot.customer.email,
      this.snapshot.customer.name
    );
    const recipients = [recipient];
    const personalization = this.getPersonalization(recipient);

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Tack för din beställning!")
      .setTemplateId(this.ORDER_CONFIRMATION_TEMPLATE_ID)
      .setPersonalization(personalization);

    return this.client.email.send(emailParams);
  }

  public sendAdminNotification(email = this.adminEmail) {
    console.log("sending admin nptification to", email);
    const sentFrom = new Sender(this.adminEmail, config.siteTitle);
    const recipient = new Recipient(email);
    const recipients = [recipient];
    const { customer } = this.snapshot;
    const replyTo = new Sender(customer.email, customer.name);
    const personalization = this.getPersonalization(recipient);

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(replyTo)
      .setSubject("Ny order från hemsidan")
      .setTemplateId(this.ADMIN_NOTIFICATION_TEMPLATE_ID)
      .setPersonalization(personalization);

    return this.client.email.send(emailParams);
  }
}
