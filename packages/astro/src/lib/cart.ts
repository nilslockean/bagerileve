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
type CartItem = z.infer<typeof cartItemSchema>;

export type CartTotal = {
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

export function addToCart(cart: Cart, item: CartItem, maxQty?: number): Cart {
  // Total quantity of this product already in cart (all price options)
  const qtyInCart = cart.items
    .filter((i) => i.productId === item.productId)
    .reduce((sum, i) => sum + i.qty, 0);

  const qtyLimit =
    maxQty !== undefined ? Math.max(maxQty - qtyInCart, 0) : item.qty;

  const qtyToAdd =
    maxQty !== undefined ? Math.min(item.qty, qtyLimit) : item.qty;

  // Nothing to add → return cart unchanged
  if (qtyToAdd <= 0) {
    return cart;
  }

  // Find items in cart with same id and price option
  const existing = cart.items.find(
    (i) => i.productId === item.productId && i.price === item.price
  );

  if (existing) {
    existing.qty += qtyToAdd;
  } else {
    cart.items.push({
      ...item,
      qty: qtyToAdd,
    });
  }

  return cart;
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
