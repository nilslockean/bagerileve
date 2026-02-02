import { getCart, setCart } from "@lib/cart";
import { defineAction, ActionError } from "astro:actions";
import { getEntry } from "astro:content";
import { z } from "astro:schema";

export const server = {
  // action declarations
  addToCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
      price: z.number(),
      qty: z.number(),
      // pickupDate: z.coerce.date(),
    }),
    handler: async (input, context) => {
      const { productId, price, qty } = input;

      // 1. Fetch product
      const entry = await getEntry("products", productId);

      if (!entry) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Produkten finns inte.",
        });
      }

      const product = entry.data;

      // 2. Check stock status
      if (product.outOfStock) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Produkten är fullbokad.",
        });
      }

      // 3. Validate price option
      const validPrice = product.prices.some(
        (option) => option.price === price
      );

      if (!validPrice) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Ogiltigt prisalternativ.",
        });
      }

      // 4. Validate quantity
      const maxQty = product.maxQuantityPerOrder;

      if (maxQty > 0 && qty > maxQty) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: `Du kan max beställa ${maxQty} st av denna produkt.`,
        });
      }

      // 5. Validate pickup date in checkout instead
      // // Pickup date must be in the future
      // const today = new Date();
      // today.setHours(0, 0, 0, 0);

      // const pickup = new Date(pickupDate);
      // pickup.setHours(0, 0, 0, 0);

      // if (pickup < today) {
      //   throw new ActionError({
      //     code: "BAD_REQUEST",
      //     message:
      //       "Vänligen välj ett upphämtningsdatum inom butikens öppettider.",
      //   });
      // }

      // // If product has specific pickup dates, make sure the input date matches
      // if (product.pickupDates?.length) {
      //   const allowedDates = product.pickupDates.map((dateStr) => {
      //     const d = new Date(dateStr);
      //     d.setHours(0, 0, 0, 0);
      //     return d.getTime();
      //   });

      //   if (!allowedDates.includes(pickup.getTime())) {
      //     throw new ActionError({
      //       code: "BAD_REQUEST",
      //       message: `${product.title} kan inte hämtas detta datum.`,
      //     });
      //   }
      // }

      const cart = getCart(context.cookies);
      const existing = cart.items.find(
        (item) => item.productId === product.id && item.price === input.price
      );

      // Update cart item in place if it exists
      if (existing) {
        const requestedQty = existing.qty + input.qty;

        existing.qty = product.maxQuantityPerOrder
          ? Math.min(product.maxQuantityPerOrder, requestedQty)
          : requestedQty;
      } else {
        cart.items.push({
          productId: product.id,
          price: input.price,
          qty: input.qty,
        });
      }

      setCart(context.cookies, cart);

      // ✅ All validation passed
      return {
        success: true,
        productTitle: product.title,
      };
    },
  }),
};
