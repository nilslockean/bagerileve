import { test, expect, describe } from "vitest";
import { sanityAsset } from "./sanityAsset";

describe("sanityAsset", () => {
  test("should return the correct URL", () => {
    const result = sanityAsset("myfile.mp4", "12345", "production");
    expect(result).toBe(
      "https://cdn.sanity.io/files/12345/production/myfile.mp4"
    );
  });
});
