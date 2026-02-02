import type { APIContext } from "astro";
import { parse, serialize } from "cookie";
import { sanityAPI } from "@lib/sanityAPI"; // your helper that can fetch products
import { getDateString } from "@lib/dateUtils";

export async function addToCart(context: APIContext) {
  try {
    const formData = await context.request.formData();

    const productId = formData.get("productId")?.toString();
    const selectedVariant = formData.get("variant")?.toString();
    const pickupDate = formData.get("pickupDate")?.toString();
    const quantity = Number(formData.get("quantity") || 1);

    if (!productId || !selectedVariant || !pickupDate) {
      return new Response("Missing required fields", { status: 400 });
    }

    // ✅ Fetch product securely from Sanity
    const product = await sanityAPI.getProductById(productId);
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    if (product.outOfStock) {
      return new Response("Product is fullbokad", { status: 400 });
    }

    // ✅ Validate variant
    const priceOption = product.prices.find(
      (p: any) =>
        p.description === selectedVariant ||
        (!p.description && selectedVariant === "standard")
    );
    if (!priceOption) {
      return new Response("Invalid price option", { status: 400 });
    }

    // ✅ Validate quantity
    const maxQty = product.maxQuantityPerOrder || 5;
    if (quantity < 1 || quantity > maxQty) {
      return new Response(`Quantity must be between 1 and ${maxQty}`, {
        status: 400,
      });
    }

    // ✅ Validate pickup date
    const validPickupDates = product.pickupDates?.length
      ? product.pickupDates
      : await sanityAPI.getOpenDaysInRange(
          getDateString(new Date()),
          getDateString(new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)) // 2 weeks ahead
        );

    if (!validPickupDates.includes(pickupDate)) {
      return new Response("Invalid pickup date", { status: 400 });
    }

    // ✅ Read and update cart cookie
    const cookies = parse(context.request.headers.get("cookie") || "");
    const existingCart = cookies.cart ? JSON.parse(cookies.cart) : [];

    const newItem = {
      productId,
      title: product.title,
      variant: selectedVariant,
      price: priceOption.price,
      pickupDate,
      quantity,
    };

    const updatedCart = [...existingCart, newItem];

    const cookie = serialize("cart", JSON.stringify(updatedCart), {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // ✅ Redirect back to product page with success message
    const redirectUrl = `/bestall-preview/${product.slug.current}?added=true`;

    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": cookie,
        Location: redirectUrl,
      },
    });
  } catch (err) {
    console.error("addToCart error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
