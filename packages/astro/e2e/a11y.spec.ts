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

      const accessibilityScanResults = await new AxeBuilder({ page })
        // Behold widget is technically accessible but has some issues with presentation roles
        .exclude("behold-widget, .weglot-container, #wg_progress")
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
}
