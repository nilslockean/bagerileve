import { z } from "zod";

export const FientaEventDetailsSchema = z.object({
  id: z.number(),
  // organizer_id: z.number(),
  starts_at: z.string(),
  ends_at: z.string(),
  sale_status: z.enum(["onSale", "salesEnded", "salesNotStarted", "soldOut"]),
  is_published: z.boolean(),
  is_public: z.boolean(),
  image_url: z
    .string()
    .url()
    .transform((url) => {
      return url.endsWith(".jpg") ? url : undefined;
    }),
  // accent_color: z.string(),
  url: z.string().url(),
  buy_tickets_url: z.string().url(),
  translations: z.object({
    sv: z.object({
      title: z.string(),
      description: z.string({
        description: "HTML",
      }),
      duration_string: z.string(),
      notes_about_time: z.string().nullable(),
      // venue: z.string(),
      // online_location: z.string().nullable(),
      // address: z.object({
      // 	street: z.string(),
      // 	city: z.string(),
      // 	county: z.string(),
      // 	postal_code: z.string(),
      // 	country_code: z.string()
      // }),
      // organizer: z.object({
      // 	name: z.string(),
      // 	phone: z.string(),
      // 	email: z.string().email()
      // })
    }),
  }),
});

export type FientaEventDetails = z.infer<typeof FientaEventDetailsSchema>;
