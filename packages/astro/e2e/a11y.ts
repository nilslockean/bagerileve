import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export function assertA11y(path: string) {
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
