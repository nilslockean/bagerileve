import type { AstroCookies } from "astro";

type CartItem = {
  productId: string;
  price: number;
  qty: number;
};

type Cart = {
  items: CartItem[];
};

const CART_COOKIE = "cart";

export function getCart(cookies: AstroCookies): Cart {
  const cookie = cookies.get(CART_COOKIE);
  if (!cookie) return { items: [] };

  return cookie.json();
}

export function setCart(cookies: AstroCookies, cart: Cart) {
  cookies.set(CART_COOKIE, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}
