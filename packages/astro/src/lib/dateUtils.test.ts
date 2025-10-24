import { describe, test } from "vitest";
import { addDays, getDatesInRange, getDateString } from "./dateUtils";
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

describe("addDays", () => {
  test("returns a new Date object (does not mutate the original)", () => {
    const base = new Date("2025-10-23");
    const result = addDays(1, base);
    expect(result).not.toBe(base);
    expect(base.toISOString()).toBe("2025-10-23T00:00:00.000Z");
  });

  test("adds positive days correctly within the same month", () => {
    const result = addDays(5, new Date("2025-10-10"));
    expect(result.toISOString().startsWith("2025-10-15")).toBe(true);
  });

  test("adds negative days correctly (goes backwards)", () => {
    const result = addDays(-3, new Date("2025-10-10"));
    expect(result.toISOString().startsWith("2025-10-07")).toBe(true);
  });

  test("handles month rollover correctly", () => {
    const result = addDays(5, new Date("2025-10-29"));
    expect(result.toISOString().startsWith("2025-11-03")).toBe(true);
  });

  test("handles year rollover correctly", () => {
    const result = addDays(2, new Date("2025-12-31"));
    expect(result.toISOString().startsWith("2026-01-02")).toBe(true);
  });

  test("handles leap years correctly (29 Feb)", () => {
    const result = addDays(1, new Date("2024-02-29"));
    expect(result.toISOString().startsWith("2024-03-01")).toBe(true);
  });

  test("defaults to current date when no baseDate is given", () => {
    const before = Date.now();
    const result = addDays(0);
    const after = Date.now();
    expect(result.getTime()).toBeGreaterThanOrEqual(before);
    expect(result.getTime()).toBeLessThanOrEqual(after + 10);
  });
});
