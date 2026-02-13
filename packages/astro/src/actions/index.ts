import { MailerSendAPI } from "@lib/api/MailerSendAPI";
import {
  addToCart,
  EMPTY_CART,
  getCart,
  getCartTotal,
  setCart,
  updateCart,
} from "@lib/cart";
import { getAvailablePickupDates } from "@lib/dateUtils";
import { sanityAPI } from "@lib/sanityAPI";
import { orderSnapshotSchema } from "@lib/schemas/OrderSnapshot";
import { defineAction, ActionError } from "astro:actions";
import { getCollection, getEntry } from "astro:content";
import {
  MAILERSEND_API_KEY,
  ORDER_ADMIN_EMAIL,
  ORDER_ADMIN_PRINTER_EMAIL,
  PICKUP_DATE_MAX_OFFSET,
  PICKUP_DATE_MIN_OFFSET,
} from "astro:env/server";
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
  checkout: defineAction({
    accept: "form",
    input: z.object({
      pickupDate: z.string().date(),
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      message: z.string().optional(),
    }),
    handler: async (input, context) => {
      const { pickupDate, name, email, phone, message } = input;

      // 1. Load cart (fail if empty / invalid)
      const cart = getCart(context.cookies);
      if (cart.items.length === 0) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Kundvagnen är tom",
        });
      }

      // Get additional product info from CMS
      const products = await getCollection("products");
      const cartItems = cart.items.map((item) => {
        const collectionEntry = products.find(
          ({ id }) => id === item.productId
        );
        if (!collectionEntry) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: `Hittade ingen produkt med ID ${item.productId}`,
          });
        }

        const product = collectionEntry.data;
        const variant = product.variants.find(
          ({ price }) => item.price === price
        );
        if (!variant) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: `Hittade ingen variant med pris ${item.price}`,
          });
        }

        return {
          ...item,
          product,
          variant,
        };
      });

      // 2. Validate pickup date against cart/products
      const availablePickupDates = await getAvailablePickupDates(
        PICKUP_DATE_MIN_OFFSET,
        PICKUP_DATE_MAX_OFFSET,
        sanityAPI.getOpenDaysInRange.bind(sanityAPI),
        cartItems.map((item) => item.product)
      );
      if (!availablePickupDates.includes(pickupDate)) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: `${pickupDate} är inte ett giltigt upphämtningsdatum`,
        });
      }

      // 3. Create order in Sanity (atomic payload if possible)
      const totals = getCartTotal(cart);
      const orderSnapshot = orderSnapshotSchema.parse({
        customer: {
          name,
          email,
          phone,
          message,
        },
        pickupDate,
        items: cartItems.map(({ product, variant, price, qty }) => ({
          productTitle: product.title,
          variantId: variant.id,
          variantDescription: variant.description,
          unitPrice: price,
          quantity: qty,
          lineTotal: price * qty,
        })),
        totals,
      });
      const order = await sanityAPI.createOrder(orderSnapshot);

      const mailerSend = new MailerSendAPI({
        snapshot: orderSnapshot,
        createdAt: order._createdAt,
        orderNr: order.orderNumber,
        adminEmail: ORDER_ADMIN_EMAIL,
        apiKey: MAILERSEND_API_KEY,
        hostname: context.url.hostname,
      });

      // 4. Send confirmation email to customer
      try {
        await mailerSend.sendOrderConfirmation();
        await mailerSend.sendAdminNotification();
        await mailerSend.sendAdminNotification(ORDER_ADMIN_PRINTER_EMAIL);
      } catch (error) {
        throw new ActionError({
          code: "SERVICE_UNAVAILABLE",
          message: "Kunde inte skicka bekräftelsemail.",
        });
      }

      return {
        success: true,
        orderId: order.orderNumber,
      };

      // 6. Track order in PostHog
      // 7. Clear cart cookies
      // 8. Redirect to thank-you page with order ID
    },
  }),
};
