import { test, expect, describe } from "vitest";
import { getCanonicalUrl } from "./canonicalUrl.ts";

describe("getCanonicalUrl", () => {
  test("should return index page without trailing slash", () => {
    expect(getCanonicalUrl("https://bagerileve.se", "/")).toBe(
      "https://bagerileve.se"
    );
  });

  test("should enforce trailing slash on all other routes", () => {
    expect(getCanonicalUrl("https://bagerileve.se", "/kontakt")).toBe(
      "https://bagerileve.se/kontakt/"
    );

    expect(getCanonicalUrl("https://bagerileve.se", "/kontakt/")).toBe(
      "https://bagerileve.se/kontakt/"
    );

    expect(getCanonicalUrl("https://bagerileve.se", "/kurser/1234")).toBe(
      "https://bagerileve.se/kurser/1234/"
    );
  });
});
