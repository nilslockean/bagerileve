import { describe, test } from "vitest";
import { getDatesInRange, getDateString } from "./dateUtils";
import { expect } from "@playwright/test";

describe("getDateString", () => {
  test("should format date correctly", () => {
    const date = new Date("Thu Oct 23 2025 15:30:39 GMT+0200");
    const dateStr = getDateString(date);
    expect(dateStr).toStrictEqual("2025-10-23");
  });
});

describe("getDatesInRange", () => {
  test("should throw if start date is after end date", () => {
    expect(() => {
      getDatesInRange("2025-01-02", "2025-01-01");
    }).toThrow();
  });

  test("should throw on invalid date input", () => {
    expect(() => {
      getDatesInRange("1st january 2012", "2012-01-05");
    }).toThrow();

    expect(() => {
      getDatesInRange("2012-01-05", "not a date");
    }).toThrow();
  });

  test("should return single date if start and end date match", () => {
    const dates = getDatesInRange("2025-01-01", "2025-01-01");
    expect(dates).toStrictEqual(["2025-01-01"]);
  });

  test("should return all dates between start and end date", () => {
    const dates = getDatesInRange("2024-12-27", "2025-01-03");
    expect(dates).toStrictEqual([
      "2024-12-27",
      "2024-12-28",
      "2024-12-29",
      "2024-12-30",
      "2024-12-31",
      "2025-01-01",
      "2025-01-02",
      "2025-01-03",
    ]);
  });
});
