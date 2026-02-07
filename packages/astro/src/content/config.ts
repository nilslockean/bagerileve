import { sanityAPI } from "@lib/sanityAPI";
import { ProductSchema } from "@lib/schemas/Product";
import { defineCollection, z } from "astro:content";
import groq from "groq";

const LoaderJSONSchema = z
  .object({
    // Astro collections require IDs to be strings, so we need to transform
    // any number IDs from the 3rd party API into strings.
    id: z.unknown().transform(String),
  })
  .passthrough();

const products = defineCollection({
  loader: async () => {
    const json = await sanityAPI.query(
      groq`*[_type == "product"] {
        'id': slug.current,
        maxQuantityPerOrder,
        title,
        content,
        images,
        variants[]{
          "id": id.current,
          price,
          description
        },
        pickupDates
      }`
    );
    return z.array(LoaderJSONSchema).parse(json);
  },
  schema: ProductSchema,
});

export const collections = { products };
