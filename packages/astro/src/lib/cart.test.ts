import { describe, test, expect } from "vitest";
import { getCartTotal, EMPTY_CART } from "./cart";

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
