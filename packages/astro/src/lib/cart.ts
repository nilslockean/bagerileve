import { type AstroCookies } from "astro";
import { z } from "zod";

const cartItemSchema = z.object({
  productId: z.string(),
  price: z.number(),
  qty: z.number(),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
});

export type Cart = z.infer<typeof cartSchema>;

type CartTotal = {
  total: number;
  tax: number;
};

const TAX_PERCENTAGE = 0.12;
const CART_COOKIE = "cart";

export const EMPTY_CART = { items: [] } as const satisfies Cart;

export function getCart(cookies: AstroCookies): Cart {
  const cookie = cookies.get(CART_COOKIE);
  if (!cookie) return EMPTY_CART;

  // Validate cookie against schema
  const parsedCookie = cartSchema.safeParse(cookie.json());
  if (parsedCookie.success) {
    return parsedCookie.data;
  }

  // Clear cookie contents if they are invalid
  cookies.delete(CART_COOKIE);

  return EMPTY_CART;
}

export function setCart(cookies: AstroCookies, cart: Cart) {
  cookies.set(CART_COOKIE, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function getCartTotal(cart: Cart): CartTotal {
  if (cart.items.length === 0) {
    return {
      tax: 0,
      total: 0,
    };
  }

  const total = cart.items.reduce(
    (acc, { qty, price }) => acc + price * qty,
    0
  );

  const tax = Math.round(total - total / (1 + TAX_PERCENTAGE));

  return {
    total,
    tax,
  };
}
