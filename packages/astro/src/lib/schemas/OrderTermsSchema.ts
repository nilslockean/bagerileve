import { z } from "zod";

export const OrderTermsSchema = z.array(
  z.object({
    title: z.string(),
    content: z.array(z.any()),
    sortOrder: z.number(),
  })
);

export type OrderTerms = z.infer<typeof OrderTermsSchema>;
