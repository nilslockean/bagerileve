import { describe, test, expect } from "vitest";
import { getCartTotal, EMPTY_CART, addToCart, type Cart } from "./cart";

describe("getCartTotal", () => {
  test("returns 0 when cart is empty", () => {
    const { total, tax } = getCartTotal(EMPTY_CART);
    expect(total).toBe(0);
    expect(tax).toBe(0);
  });

  test("calculates total correctly for single product in cart", () => {
    const { total } = getCartTotal({
      items: [
        {
          productId: "test-1",
          price: 10,
          qty: 1,
        },
      ],
    });
    expect(total).toBe(10);
  });

  test("calculates total correctly for single product with many qty in cart", () => {
    const { total } = getCartTotal({
      items: [
        {
          productId: "test-1",
          price: 10,
          qty: 3,
        },
      ],
    });
    expect(total).toBe(30);
  });

  test("calculates total correctly for multiple products in in cart", () => {
    const { total } = getCartTotal({
      items: [
        {
          productId: "test-1",
          price: 10,
          qty: 3,
        },
        {
          productId: "test-2",
          price: 59,
          qty: 1,
        },
        {
          productId: "test-3",
          price: 99.9,
          qty: 1,
        },
      ],
    });
    expect(total).toBe(188.9);
  });

  test("calucaltes tax on total correctly", () => {
    const { tax } = getCartTotal({
      items: [
        {
          productId: "test-1",
          price: 112,
          qty: 1,
        },
      ],
    });
    expect(tax).toBe(12);
  });
});

describe("addToCart", () => {
  test("adds product to empty cart", () => {
    const cart = addToCart(
      EMPTY_CART,
      {
        productId: "test-1",
        price: 1,
        qty: 1,
      },
      1
    );

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual({
      productId: "test-1",
      price: 1,
      qty: 1,
    });
  });

  test("limits qty for single item to max qty when cart is empty", () => {
    const cart = addToCart(
      EMPTY_CART,
      {
        productId: "test-1",
        price: 1,
        qty: 2,
      },
      1
    );

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual({
      productId: "test-1",
      price: 1,
      qty: 1,
    });
  });

  test("limits qty for single item to max qty when item is already in cart", () => {
    const currentCart: Cart = {
      items: [
        {
          productId: "test-1",
          price: 1,
          qty: 1,
        },
        {
          productId: "other-test-item",
          price: 1,
          qty: 1,
        },
      ],
    };
    const cart = addToCart(
      currentCart,
      {
        productId: "test-1",
        price: 1,
        qty: 3,
      },
      3
    );

    expect(cart.items).toHaveLength(2);
    expect(cart.items[0]).toEqual({
      productId: "test-1",
      price: 1,
      qty: 3,
    });
  });

  test("limits qty for item to max qty when other price option of same item is already in cart", () => {
    const currentCart: Cart = {
      items: [
        {
          productId: "test-1",
          price: 1,
          qty: 1,
        },
      ],
    };
    const cart = addToCart(
      currentCart,
      {
        productId: "test-1",
        price: 2,
        qty: 3,
      },
      3
    );

    expect(cart.items).toHaveLength(2);
    expect(cart.items[0]).toEqual({
      productId: "test-1",
      price: 1,
      qty: 1,
    });
    expect(cart.items[1]).toEqual({
      productId: "test-1",
      price: 2,
      qty: 2,
    });
  });
});
