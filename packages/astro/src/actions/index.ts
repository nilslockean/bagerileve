import { addToCart, EMPTY_CART, getCart, setCart, updateCart } from "@lib/cart";
import { defineAction, ActionError } from "astro:actions";
import { getEntry } from "astro:content";
import { z } from "astro:schema";

export const server = {
  // action declarations
  clearCart: defineAction({
    accept: "form",
    handler: async (_input, context) => {
      setCart(context.cookies, EMPTY_CART);
      return {
        success: true,
      };
    },
  }),
  updateCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
      price: z.number(),
      qty: z.number(),
    }),
    handler: async (input, context) => {
      const { productId, price, qty } = input;
      const entry = await getEntry("products", productId);

      if (!entry) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Produkten finns inte.",
        });
      }

      const product = entry.data;
      const { maxQuantityPerOrder } = product;

      const currentCart = getCart(context.cookies);
      const cart = updateCart(
        currentCart,
        {
          productId,
          price,
          qty,
        },
        maxQuantityPerOrder
      );
      setCart(context.cookies, cart);

      return {
        success: true,
      };
    },
  }),
  removeFromCart: defineAction({
    accept: "form",
    input: z.object({
      productId: z.string(),
      price: z.number(),
    }),
    handler: async (input, context) => {
      const { productId, price } = input;
      const currentCart = getCart(context.cookies);
      const cart = updateCart(currentCart, {
        productId,
        price,
        qty: 0,
      });

      setCart(context.cookies, cart);

      return cart;
    },
  }),
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
      const maxQty = product.maxQuantityPerOrder;

      // 2. Check stock status
      if (maxQty === 0) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Produkten är fullbokad.",
        });
      }

      // 3. Validate price option
      const validPrice = product.variants.some(
        (option) => option.price === price
      );

      if (!validPrice) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Ogiltigt prisalternativ.",
        });
      }

      // 4. Validate quantity
      if (maxQty !== null && qty > maxQty) {
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

      const currentCart = getCart(context.cookies);
      const cart = addToCart(
        currentCart,
        {
          productId: product.id,
          price: input.price,
          qty: input.qty,
        },
        product.maxQuantityPerOrder
      );
      setCart(context.cookies, cart);

      // ✅ All validation passed
      return {
        success: true,
        productTitle: product.title,
      };
    },
  }),
};
