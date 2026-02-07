import { z } from "astro:content";

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  variants: z.array(
    z.object({
      price: z.number().min(0),
      description: z.string(),
      id: z.string(),
    })
  ),
  images: z.array(
    z.object({
      asset: z.object({
        _ref: z.string(),
      }),
      alt: z.string(),
    })
  ),
  content: z.array(z.any()), // Portable text
  maxQuantityPerOrder: z.number().min(0).nullable(),
  pickupDates: z.array(z.string().date()).nullable(),
});

export type Product = z.infer<typeof ProductSchema>;
