import { test, expect } from "@playwright/test";

test.describe("/admin", () => {
  // Should redirect to https://leve.sanity.studio/
  test("should redirect to Sanity Studio", async ({ page }) => {
    await page.goto("/admin");
    const url = page.url();
    expect(url).toBe("https://leve.sanity.studio/");
  });
});
