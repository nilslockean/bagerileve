import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Homepage
assertA11y("/");

// Courses
assertA11y("/kurser");

// Order
assertA11y("/bestall");

// Contact
assertA11y("/kontakt");

function assertA11y(path: string) {
  test.describe(path, () => {
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }) => {
      await page.goto(path);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
}