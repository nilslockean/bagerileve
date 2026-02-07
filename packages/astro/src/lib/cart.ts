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
export const EMPTY_CART = Object.freeze({ items: [] }) satisfies Cart;

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

export function addToCart(
  cart: Cart,
  item: CartItem,
  maxQty: number | null = null
): Cart {
  // const cart = Object.create(currentCart);
  const nextCart = structuredClone(cart);
  const isUnlimited = maxQty === null;

  // Total quantity of this product already in cart (all price options)
  const qtyInCart = nextCart.items
    .filter(({ productId }) => productId === item.productId)
    .reduce((sum, { qty }) => sum + qty, 0);

  const qtyLimit = isUnlimited ? item.qty : Math.max(maxQty - qtyInCart, 0);
  const qtyToAdd = isUnlimited ? item.qty : Math.min(item.qty, qtyLimit);

  // Nothing to add → return cart unchanged
  if (qtyToAdd <= 0) {
    return nextCart;
  }

  // Find items in cart with same id and price option
  const existing = nextCart.items.find(
    (i) => i.productId === item.productId && i.price === item.price
  );

  if (existing) {
    existing.qty += qtyToAdd;
  } else {
    nextCart.items.push({
      ...item,
      qty: qtyToAdd,
    });
  }

  return nextCart;
}

export function updateCart(
  cart: Cart,
  item: CartItem,
  maxQty: number | null = null
) {
  const nextCart = structuredClone(cart);
  const nextItemIndex = nextCart.items.findIndex(
    ({ productId, price }) =>
      productId === item.productId && price === item.price
  );
  const nextItem = nextCart.items[nextItemIndex];

  if (!nextItem) {
    throw new Error("PRODUCT_ID_MISMATCH");
  }

  // Remove item from cart if quanity is 0
  if (item.qty === 0) {
    nextCart.items.splice(nextItemIndex, 1);
    return nextCart;
  }

  // Add if maxQty is unlimited
  if (maxQty === null) {
    nextItem.qty = item.qty;
    return nextCart;
  }

  // Total quantity of this product already in cart (not this price option)
  const qtyInCart = nextCart.items
    .filter(
      ({ productId, price }) =>
        productId === item.productId && price !== item.price
    )
    .reduce((sum, { qty }) => sum + qty, 0);

  nextItem.qty = Math.min(item.qty, maxQty - qtyInCart);

  return nextCart;
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
